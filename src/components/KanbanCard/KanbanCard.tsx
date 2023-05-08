import Paragraph from "antd/es/typography/Paragraph";
import { FC } from "react";
import { Card } from "antd";
import { Issue } from "types/types";

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
      title={title}
      size="small"
      headStyle={{ borderBottom: "none" }}
      style={{ width: "100%", cursor: "grab", border: "3px solid #000" }}
    >
      <Paragraph>
        #{number} {created_at}
      </Paragraph>
      <Paragraph>
        {login} | Comments: {comments}
      </Paragraph>
    </Card>
  );
};

export default KanbanCard;
