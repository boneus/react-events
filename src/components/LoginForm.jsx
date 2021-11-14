import {useState} from 'react';
import {Form, Input, Button} from 'antd';

import {validationRules} from '@utils/forms';

const LoginForm = ({isLoading = false, onSubmit}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form onFinish={() => onSubmit({username, password})}>
      <Form.Item
        label="Username"
        name="username"
        rules={[validationRules.required('Please input your username!')]}
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[validationRules.required('Please input your password!')]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
