import { BrowserVault, Vault } from '@ionic-enterprise/identity-vault';
import { Capacitor } from '@capacitor/core';

export const createVault = (): Vault | BrowserVault => {
  return Capacitor.isNativePlatform() ? new Vault() : new BrowserVault();
};