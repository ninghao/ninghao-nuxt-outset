export type Role = {
  id: string;
  name: string;
  title: string;
};

export type User = {
  id: string;
  name: string;
  password: string;
  roles: Array<Role> | Array<string>;
};
