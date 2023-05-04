export type User = {
  login: string;
};

export type Issue = {
  title: string;
  number: number;
  created_at: string;
  user: User;
  comments: number;
};
