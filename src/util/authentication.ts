import { clearSession, getSession, setSession } from "./session-vault";

const login = async (): Promise<void> => {
  await setSession({
    email: 'test@ionic.io',
    firstName: 'Tessa',
    lastName: 'Testsmith',
    accessToken: '4abf1d79-143c-4b89-b478-19607eb5ce97',
    refreshToken: '565111b6-66c3-4527-9238-6ea2cc017126',
  });
}

const logout = async (): Promise<void> => {
  await clearSession()
}

const isAuthenticated = async (): Promise<boolean> => {
  const session = await getSession();
  return !!session
}

export {
  isAuthenticated,
  login,
  logout,
}