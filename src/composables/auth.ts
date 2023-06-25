export type CurrentUser = {
  id: string;
  name: string;
  token: string;
};

export const useCurrentUser = (user?: CurrentUser | null) => {
  const currentUser = useState<CurrentUser | null>('currentUser');

  if (user) {
    currentUser.value = user;
  }

  if (user === null) {
    currentUser.value = null;
  }

  return { currentUser };
};
