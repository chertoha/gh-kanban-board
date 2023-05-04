import { List } from "antd";
import KanbanCard from "components/KanbanCard";
import { FC } from "react";
import { Issue } from "types/types";
import style from "./CardList.module.css";

interface ICardListProps {
  list: Issue[];
}

const CardList: FC<ICardListProps> = ({ list }) => {
  return (
    <div className={style.column}>
      <List
        className={style.column__list}
        dataSource={list}
        renderItem={(issue) => (
          <List.Item style={{ border: "none" }}>
            <KanbanCard issue={issue} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default CardList;
