import { RightOutlined, StarOutlined } from "@ant-design/icons";
import { Row, Space } from "antd";
import Link from "antd/es/typography/Link";
import { FC } from "react";

const InfoBar: FC = () => {
  return (
    <Space direction="horizontal" style={{ padding: "20px 0" }}>
      <Link href="">Facebook</Link>
      <RightOutlined style={{ fontSize: "12px", color: "#0958d9" }} />
      <Link href="">React</Link>
      <Space align="center" style={{ display: "flex", columnGap: "4px" }}>
        <StarOutlined style={{ fontSize: "16px", color: "#faad14" }} />
        194 K stars
      </Space>
    </Space>
  );
};

export default InfoBar;
