import CardListItem from "./CardListItem";
import CardListZeroItem from "./CardListZeroItem";
import CardListEmptyItem from "./CardListEmptyItem";
import style from "./CardList.module.css";
import { List } from "antd";
import { FC } from "react";
import { ICardListProps } from "./types/props";

const CardList: FC<ICardListProps> = (props) => {
  const { list } = props;
  return (
    <div className={style.column}>
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
    </div>
  );
};

export default CardList;
