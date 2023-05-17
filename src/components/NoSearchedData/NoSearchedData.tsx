import Paragraph from "antd/es/typography/Paragraph";
import { Space } from "antd";
import { FC } from "react";

import style from "./NoSearchedData.module.css";

const NoSearchedData: FC = () => {
  return (
    <Space direction="vertical" className={style.wrapper}>
      <Paragraph
        className={style.text}
      >{`Please search github repo!`}</Paragraph>
      <Paragraph
        className={style.text}
      >{`Template: "https://github.com/{owner}/{repo}"`}</Paragraph>
    </Space>
  );
};

export default NoSearchedData;
