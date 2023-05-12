import { RightOutlined, StarOutlined } from "@ant-design/icons";
import { Space } from "antd";
import Link from "antd/es/typography/Link";
import { FC, useEffect, useState } from "react";
import { getRepoInfo } from "services/kanbanDataService";
import { RepoInfo } from "types/types";

interface IInfoBar {
  repoPath: string;
}

const InfoBar: FC<IInfoBar> = ({ repoPath }) => {
  const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null);

  useEffect(() => {
    if (!repoPath) return;

    try {
      getRepoInfo(repoPath).then(setRepoInfo);
    } catch (err) {
      console.log(err);
    }
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
    <Space direction="horizontal" style={{ padding: "10px 0 20px" }}>
      <Link href={repoOwnerUrl} target="_blank">
        {repoOwner}
      </Link>
      <RightOutlined style={{ fontSize: "12px", color: "#0958d9" }} />
      <Link href={repoUrl} target="_blank">
        {repoName}
      </Link>
      {starNumber && (
        <Space align="center" style={{ display: "flex", columnGap: "4px" }}>
          <StarOutlined style={{ fontSize: "16px", color: "#faad14" }} />
          {starNumber} stars
        </Space>
      )}
    </Space>
  );
};

export default InfoBar;
