import { Dispatch, FC, useEffect, useState } from "react";
import { RightOutlined, StarFilled } from "@ant-design/icons";
import { Space } from "antd";
import { getRepoInfo } from "services/kanbanDataService";
import { RepoInfo } from "types/types";
import { getShortNumberView } from "utils/getShortNumberView";
import Link from "antd/es/typography/Link";
import style from "./InfoBar.module.css";

interface IInfoBar {
  repoPath: string;
  setError: Dispatch<unknown>;
}

const InfoBar: FC<IInfoBar> = ({ repoPath, setError }) => {
  const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null);

  useEffect(() => {
    if (!repoPath) return;

    getRepoInfo(repoPath)
      .then((res) => {
        setRepoInfo(res);
      })
      .catch((err) => {
        setError(err);
      });
  }, [repoPath, setError]);

  if (!repoInfo) {
    return null;
  }

  const {
    owner: { login: repoOwner, html_url: repoOwnerUrl },
    name: repoName,
    stargazers_count: starNumber,
    html_url: repoUrl,
  } = repoInfo;

  return (
    <Space direction="horizontal" className={style.infoBar}>
      <Link
        data-testid="info-owner"
        href={repoOwnerUrl}
        target="_blank"
        className={style.link}
      >
        {repoOwner}
      </Link>
      <RightOutlined className={style.arrowIcon} />

      <Link
        data-testid="info-repo"
        href={repoUrl}
        target="_blank"
        className={style.link}
      >
        {repoName}
      </Link>
      {starNumber && (
        <Space align="center" className={style.starsInfo}>
          <StarFilled className={style.starIcon} />
          {getShortNumberView(starNumber)} stars
        </Space>
      )}
    </Space>
  );
};

export default InfoBar;
