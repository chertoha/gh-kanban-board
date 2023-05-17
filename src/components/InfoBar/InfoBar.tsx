import { FC, useEffect, useState } from "react";
import { RightOutlined, StarFilled } from "@ant-design/icons";
import { Space } from "antd";
import { getRepoInfo } from "services/kanbanDataService";
import { RepoInfo } from "types/types";
import { getShortNumberView } from "utils/getShortNumberView";
import Link from "antd/es/typography/Link";

interface IInfoBar {
  repoPath: string;
}

const InfoBar: FC<IInfoBar> = ({ repoPath }) => {
  const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null);

  useEffect(() => {
    if (!repoPath) return;

    getRepoInfo(repoPath)
      .then(setRepoInfo)
      .catch((err) => {
        console.log("InfoBBar err", err);
      });
  }, [repoPath]);

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
    <Space
      direction="horizontal"
      style={{ padding: "10px 0 20px", fontSize: "18px" }}
    >
      <Link
        data-testid="info-owner"
        href={repoOwnerUrl}
        target="_blank"
        style={{ fontSize: "18px", textTransform: "capitalize" }}
      >
        {repoOwner}
      </Link>
      <RightOutlined style={{ fontSize: "14px", color: "#0958d9" }} />

      <Link
        data-testid="info-repo"
        href={repoUrl}
        target="_blank"
        style={{ fontSize: "18px", textTransform: "capitalize" }}
      >
        {repoName}
      </Link>
      {starNumber && (
        <Space
          align="center"
          style={{ display: "flex", columnGap: "4px", marginLeft: "20px" }}
        >
          <StarFilled style={{ fontSize: "20px", color: "#faad14" }} />
          {getShortNumberView(starNumber)} stars
        </Space>
      )}
    </Space>
  );
};

export default InfoBar;
