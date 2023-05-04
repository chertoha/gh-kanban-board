import { Card } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { DragEvent, FC, useState } from "react";
import { Issue } from "types/types";

interface KanbanCardProps {
  issue: Issue;
}

const KanbanCard: FC<KanbanCardProps> = ({ issue }) => {
  const {
    title,
    number,
    user: { login },
    comments,
    created_at,
  } = issue;

  // const [currentCard, setCurrentCard] = useState(null);

  // const dragStartHandler = (e: DragEvent<HTMLDivElement>, card: Issue) => {
  //   console.log("dragStartHandler", card);
  //   setCurrentCard(setCurrentCard);
  // };

  // const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
  //   console.log("dragEndHandler");
  // };

  // const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   console.log("dragOverHandler");
  // };

  // const dropHandler = (e: DragEvent<HTMLDivElement>, card: Issue) => {
  //   e.preventDefault();
  //   console.log("dropHandler", card);
  // };

  return (
    <Card
      draggable={true}
      // onDragStart={(e) => dragStartHandler(e, issue)}
      // onDragLeave={(e) => dragEndHandler(e)}
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
