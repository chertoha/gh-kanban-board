export const ISSUES_STORAGE_KEY = "kanban_issues";

export const SEARCH_STORAGE_KEY = "kanban_search";
export const SEARCH_URL_BASE_PREFIX = "https://github.com/";
export const SEARCH_VALIDATION_PATTERN =
  /^https:\/\/github\.com\/[\w-]+\/[\w-]+$/;
export const SEARCH_VALIDATION_MESSAGE = {
  REQUIRED: "Please input repo url!",
  MATCH_EXPRESSION:
    "Search value should fit template [https://github.com/{owner name}/{repo name}]. Owner and repo names must not contain special symbols",
};
