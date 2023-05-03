import { List } from "antd";
import KanbanCard from "components/KanbanCard";
import { FC } from "react";
import style from "./CardList.module.css";

const CardList: FC = () => {
  const data = [
    {
      title: "Some issue title 1",
    },
    {
      title: "Some issue title 2",
    },
    {
      title: "Some issue title 3",
    },
    {
      title: "Some issue title 4",
    },
  ];

  return (
    // <ul className={style.column}>
    //   <li>
    //     <KanbanCard />
    //   </li>
    //   <li>
    //     <KanbanCard />
    //   </li>
    //   <li>
    //     <KanbanCard />
    //   </li>
    //   <li>
    //     <KanbanCard />
    //   </li>
    // </ul>
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.title}>Card content</Card>
        </List.Item>
      )}
    />
  );
};

export default CardList;
