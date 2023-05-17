import Paragraph from "antd/es/typography/Paragraph";
import style from "./SearchError.module.css";
import { Space } from "antd";
import { FC } from "react";
import { AxiosError } from "axios";

interface ISearchErrorProps {
  error: unknown;
}

const SearchError: FC<ISearchErrorProps> = ({ error }) => {
  let message: string;

  if (error instanceof AxiosError && error.response?.status === 404) {
    message = "Repo not found! Please search existed one.";
  } else {
    message = "Something went wrong! Try again later or try another repo url";
  }

  return (
    <Space direction="vertical" className={style.wrapper}>
      <Paragraph className={style.text}>{message}</Paragraph>
    </Space>
  );
};

export default SearchError;
