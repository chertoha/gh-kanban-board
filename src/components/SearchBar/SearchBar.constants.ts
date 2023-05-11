export const SEARCH_VALIDATION_PATTERN =
  /^https:\/\/github\.com\/[\w-]+\/[\w-]+$/;

export const SEARCH_VALIDATION_MESSAGE = {
  REQUIRED: "Please input repo url!",
  MATCH_EXPRESSION:
    "Search value should fit template [https://github.com/{owner name}/{repo name}]. Owner and repo names must not contain special symbols",
};
