export type User = {
  login: string;
};

export type Issue = {
  id: number | string;
  title: string;
  number: number;
  created_at: string;
  user: User;
  comments: number;
};
