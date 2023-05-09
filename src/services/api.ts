import axios from "axios";
import { Issue } from "types/types";

const BASE_URL = process.env.REACT_APP_GH_API_BASE_REPO_URL;

axios.defaults.baseURL = BASE_URL;

const PARAMS = {
  NEW_ISSUES: { state: "open", assignee: "none" },
  IN_PROGRESS_ISSUES: { state: "open", assignee: "*" },
  CLOSED_ISSUES: { state: "closed" },
};

export const api = {
  getStars: async (owner: string, repo: string): Promise<number> => {
    const response = await axios.get(`/${owner}/${repo}`);
    return response.data.stargazers_count;
  },

  getNewIssues: async (owner: string, repo: string): Promise<Issue[]> => {
    const response = await axios.get(`/${owner}/${repo}/issues`, {
      params: { ...PARAMS.NEW_ISSUES },
    });
    return response.data;
  },

  getInProgressIssues: async (
    owner: string,
    repo: string
  ): Promise<Issue[]> => {
    const response = await axios.get(`/${owner}/${repo}/issues`, {
      params: { ...PARAMS.IN_PROGRESS_ISSUES },
    });
    return response.data;
  },

  getClosedIssues: async (owner: string, repo: string): Promise<Issue[]> => {
    const response = await axios.get(`/${owner}/${repo}/issues`, {
      params: { ...PARAMS.CLOSED_ISSUES },
    });
    return response.data;
  },
};
