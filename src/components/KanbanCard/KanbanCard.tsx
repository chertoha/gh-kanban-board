import { Card } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { DragEvent, FC, useState } from "react";
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

  // const [currentCard, setCurrentCard] = useState(null);

  // const dragStartHandler = (e: DragEvent<HTMLDivElement>, card: Issue) => {};

  // const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
  //   e.currentTarget.style.borderBottom = "none";
  // };

  // const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
  //   e.currentTarget.style.borderBottom = "none";
  // };

  // const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   e.currentTarget.style.borderBottom = "3px solid gray";
  // };

  // const dropHandler = (e: DragEvent<HTMLDivElement>, card: Issue) => {
  //   e.preventDefault();
  // };

  return (
    <Card
      // draggable={true}
      // onDragStart={(e) => dragStartHandler(e, issue)}
      // onDragLeave={(e) => dragLeaveHandler(e)}
      // onDragEnd={(e) => dragEndHandler(e)}
      // onDragOver={(e) => dragOverHandler(e)}
      // onDrop={(e) => dropHandler(e, issue)}
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
