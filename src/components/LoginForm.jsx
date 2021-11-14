import {useState} from 'react';
import {Form, Input, Button} from 'antd';

import {validationRules} from '@utils/forms';
import {useAuthActions, useAuthSelector} from '@store/ducks/features/auth';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {isLoading} = useAuthSelector();
  const {login} = useAuthActions();

  const submit = () => {
    login({username, password});
  };

  return (
    <Form onFinish={submit}>
      <Form.Item
        label='Username'
        name='username'
        rules={[validationRules.required('Please input your username!')]}
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[validationRules.required('Please input your password!')]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
