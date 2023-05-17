import Paragraph from "antd/es/typography/Paragraph";
import { FC } from "react";
import { Card, Space } from "antd";

import { Issue } from "types/types";
import { getSpecialDateView } from "utils/getSpecialDateView";

import style from "./KanbanCard.module.css";

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
      className={`kanbanCard ${style.card}`}
      title={title}
      size="small"
      headStyle={{ borderBottom: "none", fontSize: "16px" }}
    >
      <Paragraph>
        <span className={style.issueNumber}>#{number}</span>
        <span className={style.issueDate}>
          opened {getSpecialDateView(created_at)}
        </span>
      </Paragraph>
      <Paragraph className={style.bottomRow}>
        <Space size="small">
          <span className={style.issueOwner}>{login}</span> |
          <span>Comments: {comments}</span>
        </Space>
      </Paragraph>
    </Card>
  );
};

export default KanbanCard;
