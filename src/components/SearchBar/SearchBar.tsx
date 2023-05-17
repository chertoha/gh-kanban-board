import style from "./SearchBar.module.css";
import { Button, Col, Form, Input, Row } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import {
  SEARCH_VALIDATION_MESSAGE,
  SEARCH_VALIDATION_PATTERN,
} from "utils/constants";

type FormValues = {
  repoUrl: string;
};

const validationRules = [
  { required: true, message: SEARCH_VALIDATION_MESSAGE.REQUIRED },
  {
    pattern: SEARCH_VALIDATION_PATTERN,
    message: SEARCH_VALIDATION_MESSAGE.MATCH_EXPRESSION,
  },
];

interface ISearchBarProps {
  onSearch: Dispatch<SetStateAction<string>>;
  value: string;
}

const SearchBar: FC<ISearchBarProps> = ({ onSearch, value }) => {
  const onFinish = ({ repoUrl }: FormValues) => {
    onSearch(repoUrl);
  };

  return (
    <section className={style.searchSection}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col flex="auto">
            <Form.Item
              initialValue={value}
              className={style.inputWrapper}
              name="repoUrl"
              rules={validationRules}
            >
              <Input
                data-testid="search-input"
                placeholder="Enter repo URL"
                size="large"
                className={style.searchInput}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className={style.inputWrapper}>
              <Button
                data-testid="search-submit"
                type="default"
                htmlType="submit"
                size="large"
                className={style.searchButton}
              >
                Load issues
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </section>
  );
};

export default SearchBar;
