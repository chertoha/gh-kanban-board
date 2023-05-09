import axios from "axios";
import { Issue } from "types/types";

const BASE_URL = process.env.REACT_APP_GH_API_BASE_REPO_URL;

axios.defaults.baseURL = BASE_URL;

export const api = {
  getStars: async (owner: string, repo: string): Promise<number> => {
    const response = await axios.get(`/${owner}/${repo}`);
    return response.data.stargazers_count;
  },

  getIssues: async (owner: string, repo: string): Promise<Issue[]> => {
    const response = await axios.get(`/${owner}/${repo}/issues`);
    return response.data;
  },
};
