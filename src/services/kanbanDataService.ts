import { Issue, RepoInfo } from "types/types";
import { api, PARAMS } from "./api";

export const getRepoInfo = async (path: string): Promise<RepoInfo> => {
  return await api.fetchRepo(`/${path}`);
};

export const getTodoIssues = async (path: string): Promise<Issue[]> => {
  return await api.fetchIssues(`/${path}`, PARAMS.NEW_ISSUES);
};

export const getInProgressIssues = async (path: string): Promise<Issue[]> => {
  return await api.fetchIssues(`/${path}`, PARAMS.IN_PROGRESS_ISSUES);
};

export const getDoneIssues = async (path: string): Promise<Issue[]> => {
  return await api.fetchIssues(`/${path}`, PARAMS.CLOSED_ISSUES);
};
