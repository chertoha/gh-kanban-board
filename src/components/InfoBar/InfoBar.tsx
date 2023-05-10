import { RightOutlined, StarOutlined } from "@ant-design/icons";
import { Space } from "antd";
import Link from "antd/es/typography/Link";
import { FC, useEffect, useState } from "react";
import { getRepoInfo } from "services/kanbanDataService";
import { RepoInfo } from "types/types";

const InfoBar: FC = () => {
  const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null);

  useEffect(() => {
    try {
      getRepoInfo("facebook", "react").then(setRepoInfo);
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (!repoInfo) {
    return null;
  }

  console.log(repoInfo);

  const {
    owner: { login: repoOwner, html_url: repoOwnerUrl },
    name: repoName,
    stargazers_count: starNumber,
    html_url: repoUrl,
  } = repoInfo;

  return (
    <Space direction="horizontal" style={{ padding: "10px 0 20px" }}>
      <Link href={repoOwnerUrl}>{repoOwner}</Link>
      <RightOutlined style={{ fontSize: "12px", color: "#0958d9" }} />
      <Link href={repoUrl}>{repoName}</Link>
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
