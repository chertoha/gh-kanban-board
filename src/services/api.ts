import axios from "axios";
import { Issue } from "types/types";

const BASE_URL = process.env.REACT_APP_GH_API_BASE_REPO_URL;

axios.defaults.baseURL = BASE_URL;

export const PARAMS = {
  NEW_ISSUES: { state: "open", assignee: "none" },
  IN_PROGRESS_ISSUES: { state: "open", assignee: "*" },
  CLOSED_ISSUES: { state: "closed" },
};

export const api = {
  fetchRepo: async (path: string, params?: object) => {
    const response = await axios.get(`${path}`, { params });
    // console.log(response.data);
    return response.data;
  },

  fetchIssues: async (path: string, params?: object): Promise<Issue[]> => {
    const response = await axios.get(`${path}/issues`, { params });
    return response.data;
  },
};
