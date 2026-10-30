/* biome-ignore-all lint/style/noUnusedTemplateLiteral: required to create new file */
import axios from 'axios';

import { toast } from '@/components/ui/toast';

import { LOCAL_STORAGE_KEY, StoryTrackerSettingDefaultValue } from '@/constants';
import {
  type ProfileDriveData,
  ProfileDriveDataSchema,
  type ProfileSetting,
  ProfileSettingSchema,
  type TrackerSetting,
  TrackerSettingSchema,
  type UserSavedTrack,
  UserTrackListSchema,
} from '@/schemas/models';
import type { GoogleDriveCreate, GoogleDriveGetFiles } from '@/schemas/types';

import { itemStorage } from './storage';
import { handleApiResponseError, validateDataBySchema } from './utils';

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const BDTALES_DRIVE_FOLDER = 'bandori-tales';
const BDTALES_DATA_FILE = 'bdtales-data.json';

export const GoogleDriveUtils = {
  getFolderId: async (access_token: string) => {
    try {
      const query = `name = '${BDTALES_DRIVE_FOLDER}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
      const result = await axios.get<GoogleDriveGetFiles>(
        'https://www.googleapis.com/drive/v3/files',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            q: query,
          },
        }
      );

      const data = result.data;
      if (data.files && data.files.length > 0) return data.files[0].id;

      const createResult = await axios.post<GoogleDriveCreate>(
        'https://www.googleapis.com/drive/v3/files',
        {
          name: BDTALES_DRIVE_FOLDER,
          mimeType: 'application/vnd.google-apps.folder',
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return createResult.data.id;
    } catch (error) {
      handleApiResponseError(error, { withToast: false });
      return null;
    }
  },

  getFileId: async (access_token: string, folder_id: string) => {
    try {
      const query = `name='${BDTALES_DATA_FILE}' and '${folder_id}' in parents and trashed=false`;
      const result = await axios.get<GoogleDriveGetFiles>(
        'https://www.googleapis.com/drive/v3/files',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            q: query,
          },
        }
      );

      const data = result.data;
      if (!data.files || data.files.length === 0) return null;

      return data.files[0].id;
    } catch (error) {
      handleApiResponseError(error, { withToast: false });
      return null;
    }
  },

  getUserEmail: async (access_token: string) => {
    try {
      const response = await axios.get<{ email: string }>(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      return response.data.email;
    } catch (error) {
      handleApiResponseError(error, { withToast: true });
      return null;
    }
  },

  getDataJsonFile: async (access_token: string, file_id: string) => {
    try {
      const fileResult = await axios.get<ProfileDriveData>(
        `https://www.googleapis.com/drive/v3/files/${file_id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            alt: 'media',
          },
        }
      );

      return validateDataBySchema(fileResult.data, ProfileDriveDataSchema);
    } catch (error) {
      handleApiResponseError(error, { withToast: true });
      return null;
    }
  },

  getData: async (access_token: string) => {
    const folderId = await GoogleDriveUtils.getFolderId(access_token);
    if (!folderId) return null;

    const fileId = await GoogleDriveUtils.getFileId(access_token, folderId);

    if (!fileId) return null;

    return await GoogleDriveUtils.getDataJsonFile(access_token, fileId);
  },

  exportData: async (access_token: string) => {
    try {
      const folderId = await GoogleDriveUtils.getFolderId(access_token);
      if (!folderId) return null;

      const fileId = await GoogleDriveUtils.getFileId(access_token, folderId);

      const userProfileSettingData = validateDataBySchema(
        itemStorage.local.get<ProfileSetting>(LOCAL_STORAGE_KEY.PROFILE.GENERAL_SETTING),
        ProfileSettingSchema,
        { defaultValue: {} }
      );
      const userStoryTrackerData = validateDataBySchema(
        itemStorage.local.get<UserSavedTrack[]>(LOCAL_STORAGE_KEY.STORY_TRACKER.USER_READING_TRACK),
        UserTrackListSchema,
        { defaultValue: [] }
      );
      const userStoryTrackerSettingData = validateDataBySchema(
        itemStorage.local.get<TrackerSetting>(LOCAL_STORAGE_KEY.STORY_TRACKER.SETTING),
        TrackerSettingSchema,
        { defaultValue: StoryTrackerSettingDefaultValue }
      );
      const userStoryTrackerLastUpdate =
        itemStorage.local.get<string>(LOCAL_STORAGE_KEY.STORY_TRACKER.LAST_UPDATE) ||
        String(new Date(Date.now()));

      const currentDate = new Date(Date.now());

      const exportData: ProfileDriveData = {
        user_profile: userProfileSettingData,
        story_tracker: {
          track_list: userStoryTrackerData,
          settings: userStoryTrackerSettingData,
          last_update: userStoryTrackerLastUpdate,
        },
        global_last_update: String(currentDate),
      };

      const fileContent = JSON.stringify(exportData, null, 2);

      if (fileId === null) {
        const boundary = `bdtales_${Date.now()}`;

        const metadata = {
          name: BDTALES_DATA_FILE,
          parents: [folderId],
          mimeType: 'application/json',
        };

        const body =
          `--${boundary}\r\n` +
          `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
          `${JSON.stringify(metadata)}\r\n` +
          `--${boundary}\r\n` +
          `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
          `${fileContent}\r\n` +
          `--${boundary}--`;

        await axios.post<GoogleDriveCreate>(
          'https://www.googleapis.com/upload/drive/v3/files',
          body,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              'Content-Type': `multipart/related; boundary=${boundary}`,
            },
            params: {
              uploadType: 'multipart',
            },
          }
        );
      } else {
        await axios.patch(
          `https://www.googleapis.com/upload/drive/v3/files/${fileId}`,
          fileContent,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              'Content-Type': 'application/json',
            },
            params: {
              uploadType: 'media',
            },
          }
        );
      }

      toast.success('Data exported!');
    } catch (error) {
      handleApiResponseError(error, { withToast: true });
    }
  },

  importData: async (access_token: string) => {
    try {
      const folderId = await GoogleDriveUtils.getFolderId(access_token);
      if (!folderId) return null;

      const fileId = await GoogleDriveUtils.getFileId(access_token, folderId);

      if (!fileId) {
        toast.error('Backup file not found');
        return null;
      }

      const importData = await GoogleDriveUtils.getDataJsonFile(access_token, fileId);

      const validatedImportData = validateDataBySchema(importData, ProfileDriveDataSchema, {
        defaultValue: null,
        showErrorToast: true,
        errorText: 'Failed to import. Invalid data',
      });

      if (!validatedImportData) return null;

      itemStorage.local.set(
        LOCAL_STORAGE_KEY.PROFILE.GENERAL_SETTING,
        validatedImportData.user_profile
      );
      itemStorage.local.set(
        LOCAL_STORAGE_KEY.STORY_TRACKER.USER_READING_TRACK,
        validatedImportData.story_tracker.track_list
      );
      itemStorage.local.set(
        LOCAL_STORAGE_KEY.STORY_TRACKER.SETTING,
        validatedImportData.story_tracker.settings
      );
      itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.LAST_UPDATE, new Date(Date.now()));

      toast.success('Data imported!');
    } catch (error) {
      handleApiResponseError(error, { withToast: true });
    }
  },
};
