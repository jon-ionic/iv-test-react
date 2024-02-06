import {
  BrowserVault,
  DeviceSecurityType,
  IdentityVaultConfig,
  Vault,
  VaultType,
} from '@ionic-enterprise/identity-vault';
import { createVault } from './vault-factory';
import { Session } from '../models/Session';
import { useSyncExternalStore } from 'react';

type UnlockMode =
  | 'BiometricsWithPasscode'
  | 'InMemory'
  | 'SecureStorage';

const vault = createVault();
let session: Session | null = null;
let listeners: any[] = [];

const initializeVault = async (): Promise<void> => {
  await vault.initialize({
    key: 'io.ionic.gettingstartediv',
    type: VaultType.SecureStorage,
    deviceSecurityType: DeviceSecurityType.None,
  });
  console.log('vault initialized')
};

const setSession = async (newSession: Session): Promise<void> => {
  vault.setValue('session', newSession);
  console.log('setting vault to', newSession)
  session = newSession;
  emitChange();
}

const getSession = async (): Promise<Session | null> => {
  console.log('getting session...')
  if (!session) {
    if (await vault.isEmpty()) {
      console.log('vault is empty...')
      session = null;
    } else {
      session = await vault.getValue<Session>('session');
    }
  }
  console.log('saving session variable as', session)
  emitChange()
  return session;
};

const clearSession = async (): Promise<void> => {
  await vault.clear();
  session = null;
  emitChange();
}

const updateUnlockMode = async (mode: UnlockMode): Promise<void> => {
  const type =
    mode === 'BiometricsWithPasscode'
      ? VaultType.DeviceSecurity
      : mode === 'InMemory'
      ? VaultType.InMemory
      : VaultType.SecureStorage;
  await vault.updateConfig({
    ...(vault.config as IdentityVaultConfig),
    type,
  });
};

const getSnapshot = (): Session | null => {
  return session;
}

const subscribe = (listener: any) => {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const lockSession = async (): Promise<void> => {
  await vault.lock();
  session = null;
  emitChange();
};

const emitChange = () => {
  for (let listener of listeners) {
    listener();
  }
};

const initialize = async (): Promise<void> => {
  await initializeVault()
  await getSession()
}

export {
  initializeVault,
  subscribe,
  getSession,
  setSession,
  getSnapshot,
  initialize,
  clearSession,
  updateUnlockMode,
  lockSession,
}