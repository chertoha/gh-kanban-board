import { Button, Col, Form, Input, Row } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import {
  SEARCH_VALIDATION_MESSAGE,
  SEARCH_VALIDATION_PATTERN,
} from "utils/constants";

type FormValues = {
  repoUrl: string;
};

interface ISearchBarProps {
  onSearch: Dispatch<SetStateAction<string>>;
  value: string;
}

const SearchBar: FC<ISearchBarProps> = ({ onSearch, value }) => {
  const onFinish = ({ repoUrl }: FormValues) => {
    onSearch(repoUrl);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section style={{ paddingBottom: "10px" }}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col flex="auto">
            <Form.Item
              initialValue={value}
              style={{ margin: 0 }}
              name="repoUrl"
              rules={[
                { required: true, message: SEARCH_VALIDATION_MESSAGE.REQUIRED },
                {
                  pattern: SEARCH_VALIDATION_PATTERN,
                  message: SEARCH_VALIDATION_MESSAGE.MATCH_EXPRESSION,
                },
              ]}
            >
              <Input
                data-testid="search-input"
                placeholder="Enter repo URL"
                size="large"
                style={{ fontSize: "20px", color: "#8c8c8c" }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item style={{ margin: 0 }}>
              <Button
                type="default"
                htmlType="submit"
                size="large"
                style={{ fontSize: "20px", height: "100%", color: "#8c8c8c" }}
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
