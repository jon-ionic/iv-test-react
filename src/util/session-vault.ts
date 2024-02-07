import {
  Vault,
  BrowserVault,
  DeviceSecurityType,
  IdentityVaultConfig,
  VaultType,
} from '@ionic-enterprise/identity-vault';
import { createVault } from './vault-factory';
import { Session } from '../models/Session';

type UnlockMode =
  | 'BiometricsWithPasscode'
  | 'InMemory'
  | 'SecureStorage';

const vault: Vault | BrowserVault = createVault();
let session: Session | null = null;
let listeners: any[] = [];

const initializeVault = async (): Promise<void> => {
  await vault.initialize({
    key: 'io.ionic.gettingstartedivreact',
    type: VaultType.SecureStorage,
    deviceSecurityType: DeviceSecurityType.None,
    lockAfterBackgrounded: 2000,
  });
};

const setSession = async (newSession: Session): Promise<void> => {
  vault.setValue('session', newSession);
  session = newSession;
  emitChange();
}

const getSession = async (): Promise<Session | null> => {
  if (session === null) {
    if (await vault.isEmpty()) session = null; 
    else session = await vault.getValue<Session>('session');
  }
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
  subscribe,
  getSession,
  setSession,
  getSnapshot,
  initialize,
  clearSession,
  updateUnlockMode,
  lockSession,
}