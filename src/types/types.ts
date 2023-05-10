export type IssueUser = {
  login: string;
};

export type Issue = {
  id: number | string;
  title: string;
  number: number;
  created_at: string;
  user: IssueUser;
  comments: number;
};

export type RepoOwner = {
  login: string;
  html_url: string;
};

export type RepoInfo = {
  name: string;
  owner: RepoOwner;
  stargazers_count: number;
  html_url: string;
};
