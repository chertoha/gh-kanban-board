import Paragraph from "antd/es/typography/Paragraph";
import { FC } from "react";
import { Card, Space } from "antd";
import { Issue } from "types/types";
import { getSpecialDateView } from "utils/getSpecialDateView";

interface IKanbanCardProps {
  issue: Issue;
}

const KanbanCard: FC<IKanbanCardProps> = ({ issue }) => {
  const {
    title,
    number,
    user: { login },
    comments,
    created_at,
  } = issue;

  return (
    <Card
      className="kanbanCard"
      title={title}
      size="small"
      headStyle={{ borderBottom: "none", fontSize: "16px" }}
      style={{
        width: "100%",
        cursor: "grab",
        border: " 1px solid #EEEEEE",
        backgroundColor: "#ffffff",
      }}
    >
      <Paragraph>
        <span style={{ color: "#73d13d" }}>#{number}</span>
        <span style={{ fontStyle: "italic", marginLeft: "10px" }}>
          opened {getSpecialDateView(created_at)}
        </span>
      </Paragraph>
      <Paragraph style={{ color: "#8c8c8c" }}>
        <Space size="small">
          <span style={{ textDecoration: "underline" }}>{login}</span> |{" "}
          <span>Comments: {comments}</span>
        </Space>
      </Paragraph>
    </Card>
  );
};

export default KanbanCard;
