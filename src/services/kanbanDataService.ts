import { Issue } from "types/types";
import { api, PARAMS } from "./api";

type Args = [owner: string, repo: string];

export const getRepoStars = async (
  owner: string,
  repo: string
): Promise<number> => {
  const path = `/${owner}/${repo}`;
  const data = await api.fetchRepo(path);
  return data.stargazers_count;
};

export const getTodoIssues = async (...args: Args): Promise<Issue[]> => {
  return await getIssuesByParams(...args, PARAMS.NEW_ISSUES);
};

export const getInProgressIssues = async (...args: Args): Promise<Issue[]> => {
  return await getIssuesByParams(...args, PARAMS.IN_PROGRESS_ISSUES);
};

export const getDoneIssues = async (...args: Args): Promise<Issue[]> => {
  return await getIssuesByParams(...args, PARAMS.CLOSED_ISSUES);
};

async function getIssuesByParams(owner: string, repo: string, params: object) {
  return await api.fetchIssues(`/${owner}/${repo}`, params);
}
