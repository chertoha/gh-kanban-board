import Paragraph from "antd/es/typography/Paragraph";
import style from "./KanbanCard.module.css";
import { FC } from "react";
import { Card } from "antd";
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
      // className={style.kanbanCard}
      className="kanbanCard"
      title={title}
      size="small"
      headStyle={{ borderBottom: "none" }}
      // style={{ width: "100%", cursor: "grab", border: "3px solid #000" }}
      style={{
        width: "100%",
        cursor: "grab",
        border: " 1px solid #EEEEEE",
        backgroundColor: "#ffffff",
      }}
    >
      <Paragraph>
        #{number} opened {getSpecialDateView(created_at)}
      </Paragraph>
      <Paragraph>
        {login} | Comments: {comments}
      </Paragraph>
    </Card>
  );
};

export default KanbanCard;
