import { Button, Form, Input } from 'antd';

const TestPage: React.FC<any> = () => {
  const onFinish = (values: string) => {
    console.log('Success:', values);
  };
  return (
    <Form onFinish={onFinish} autoComplete="off">
      <Form.Item label="Username" name="username">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};
export default TestPage;