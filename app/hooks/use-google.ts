import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';

import { handleApiResponseError } from '@/lib/utils';

import { COOKIE_KEY } from '@/constants';

export function useGoogleDriveAuth(revalidate: () => Promise<void>) {
  const [accessToken, setAccessToken] = useState<string | null>(
    Cookies.get()[COOKIE_KEY.PROFILE.GOOGLE_ACCESS_TOKEN] || null
  );

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const expiresAt = new Date(Date.now() + (tokenResponse.expires_in - 300) * 1000);
      Cookies.set(COOKIE_KEY.PROFILE.GOOGLE_ACCESS_TOKEN, tokenResponse.access_token, {
        expires: expiresAt,
      });
      setAccessToken(tokenResponse.access_token);
      revalidate();
    },
    onError: (error) => {
      Cookies.remove(COOKIE_KEY.PROFILE.GOOGLE_ACCESS_TOKEN);
      setAccessToken(null);

      handleApiResponseError(error, { withToast: true });
    },
    scope: 'https://www.googleapis.com/auth/drive.file email',
  });

  const logout = useCallback(() => {
    googleLogout();
    Cookies.remove(COOKIE_KEY.PROFILE.GOOGLE_ACCESS_TOKEN);
    setAccessToken(null);
    revalidate();
  }, [revalidate]);

  useEffect(() => {
    if (!accessToken) return;
    const REFRESH_INTERVAL = 56 * 60 * 1000;
    const currentAccessToken = Cookies.get(COOKIE_KEY.PROFILE.GOOGLE_ACCESS_TOKEN);

    const intervalId = setInterval(() => {
      if (!currentAccessToken) {
        setAccessToken(null);
        revalidate();
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [accessToken, revalidate]);

  return { accessToken, login, logout };
}
