import { Button, Col, Form, Input, Row } from "antd";
import { FC } from "react";

const SearchBar: FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section style={{ padding: "40px 0 10px" }}>
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
              style={{ margin: 0 }}
              name="repoUrl"
              rules={[{ required: true, message: "Please input repo url!" }]}
            >
              <Input placeholder="Enter repo URL" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item style={{ margin: 0 }}>
              <Button type="default" htmlType="submit">
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

// any type need to be changed
