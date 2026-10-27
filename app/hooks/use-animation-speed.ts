import { useCallback, useSyncExternalStore } from 'react';

import { getUserProfileSettings } from '@/lib/profile';
import { itemStorage } from '@/lib/storage';

import { LOCAL_STORAGE_KEY } from '@/constants';
import { type ITransitionSpeed, transitionSpeedValueMap } from '@/schemas/models';

const DEFAULT_SPEED: ITransitionSpeed = 'NORMAL';
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener('storage', cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', cb);
  };
}

function getSnapshot(): ITransitionSpeed {
  try {
    const v = getUserProfileSettings();
    return v.website_transition_duration || DEFAULT_SPEED;
  } catch {
    return DEFAULT_SPEED;
  }
}

const getServerSnapshot = (): ITransitionSpeed => DEFAULT_SPEED;

export function useAnimationSpeed() {
  const speed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setSpeed = useCallback((next: ITransitionSpeed) => {
    try {
      const currentSettings = getUserProfileSettings();
      itemStorage.local.set(LOCAL_STORAGE_KEY.PROFILE.GENERAL_SETTING, {
        ...currentSettings,
        website_transition_duration: next,
      });
    } catch {}
    document.documentElement.dataset.animationSpeed = next;
    listeners.forEach((l) => l());
  }, []);

  return { speed, setSpeed, durationClass: transitionSpeedValueMap[speed] };
}

export function animationSpeedScript() {
  return `
(function () {
  try {
    var raw = localStorage.getItem(${JSON.stringify(LOCAL_STORAGE_KEY.PROFILE.GENERAL_SETTING)});
    var settings = raw ? JSON.parse(raw) : null;
    var value = settings && settings.website_transition_duration;
    var allowed = ['OFF', 'FAST', 'NORMAL', 'SLOW'];
    document.documentElement.dataset.animationSpeed =
      allowed.indexOf(value) > -1 ? value : 'NORMAL';
  } catch (e) {}
})();
`;
}
