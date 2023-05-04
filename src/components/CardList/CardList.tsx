import { List } from "antd";
import KanbanCard from "components/KanbanCard";
import { FC } from "react";
import { Issue } from "types/types";
import style from "./CardList.module.css";

interface ICardListProps {
  list: Issue[];
}

const CardList: FC<ICardListProps> = ({ list }) => {
  // const issues: Issue[] = [
  //   {
  //     title: "Some issue title 1",
  //     number: 1,
  //     created_at: "2023-05-02T12:21:37Z",
  //     user: {
  //       login: "Anton",
  //     },
  //     comments: 3,
  //   },
  //   {
  //     title: "Some issue title 2",
  //     number: 2,
  //     created_at: "2023-05-02T12:21:37Z",
  //     user: {
  //       login: "Anton",
  //     },
  //     comments: 3,
  //   },
  //   {
  //     title: "Some issue title 3",
  //     number: 3,
  //     created_at: "2023-05-02T12:21:37Z",
  //     user: {
  //       login: "Anton",
  //     },
  //     comments: 3,
  //   },
  //   {
  //     title: "Some issue title 4",
  //     number: 4,
  //     created_at: "2023-05-02T12:21:37Z",
  //     user: {
  //       login: "Anton",
  //     },
  //     comments: 3,
  //   },
  // ];

  return (
    <List
      className={style.column}
      dataSource={list}
      renderItem={(issue) => (
        <List.Item style={{ border: "none" }}>
          <KanbanCard issue={issue} />
        </List.Item>
      )}
    />
  );
};

export default CardList;
