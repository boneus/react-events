import {Card} from 'antd';

import {useAuthActions, useAuthSelector} from '@store/features/auth';
import LoginForm from '@components/LoginForm';

const Login = () => {
  const {isLoading} = useAuthSelector();
  const {login} = useAuthActions();

  return (
    <Card>
      <LoginForm isLoading={isLoading} onSubmit={login}/>
    </Card>
  );
};

export default Login;
