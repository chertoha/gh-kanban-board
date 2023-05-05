import { List } from "antd";
import KanbanCard from "components/KanbanCard";
import { DragEvent, FC } from "react";
import { Issue } from "types/types";
import style from "./CardList.module.css";

interface ICardListProps {
  list: Issue[];
}

const CardList: FC<ICardListProps> = ({ list }) => {
  const dragStartHandler = (e: DragEvent<HTMLDivElement>, card: Issue) => {
    //
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    // e.currentTarget.style.borderBottom = "none";
    e.currentTarget.style.marginBottom = "0";
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    // e.currentTarget.style.borderBottom = "none";
    e.currentTarget.style.marginBottom = "0";
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // e.currentTarget.style.borderBottom = "3px solid gray";
    // e.currentTarget.classList.add("hovered-item");
    e.currentTarget.style.marginBottom = "30px";
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>, card: Issue) => {
    e.preventDefault();
  };

  return (
    <div className={style.column}>
      <List
        className={style.column__list}
        dataSource={list}
        renderItem={(issue) => (
          <List.Item
            style={{ border: "none" }}
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, issue)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, issue)}
          >
            <KanbanCard issue={issue} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default CardList;
