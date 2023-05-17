import CardListEmptyItem from "./items/CardListEmptyItem";
import { List } from "antd";
import { FC } from "react";
import { ICardListProps } from "../../types/props";
import style from "./CardList.module.css";
import CardListZeroItem from "./items/CardListZeroItem";
import CardListItem from "./items/CardListItem";

const CardList: FC<ICardListProps> = (props) => {
  const { list } = props;
  return (
    <>
      {list.length > 0 ? (
        <List
          className={style.column__list}
          dataSource={list}
          renderItem={(issue, i) => (
            <>
              {i === 0 && <CardListZeroItem {...props} />}
              <CardListItem {...props} issue={issue} />
            </>
          )}
        />
      ) : (
        <CardListEmptyItem {...props} />
      )}
    </>
  );
};

export default CardList;
