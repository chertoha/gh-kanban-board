import axios from "axios";
import { Issue } from "types/types";

export const PARAMS = {
  NEW_ISSUES: { state: "open", assignee: "none" },
  IN_PROGRESS_ISSUES: { state: "open", assignee: "*" },
  CLOSED_ISSUES: { state: "closed" },
};

const BASE_URL = process.env.REACT_APP_GH_API_BASE_REPO_URL;
const TOKEN = process.env.REACT_APP_GH_REPO_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const api = {
  fetchRepo: async (path: string, params?: object) => {
    const response = await instance.get(`${path}`, { params });
    return response.data;
  },

  fetchIssues: async (path: string, params?: object): Promise<Issue[]> => {
    // const response = await instance.get(`${path}/issues`, { params });
    const response = await instance.get(`${path}/issues`, {
      params: { ...params, page: 1, per_page: 4 },
    });
    return response.data;
  },
};
