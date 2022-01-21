import {FC} from 'react';
import {Card} from 'antd';

import {LoginForm} from '@components';
import {useAuthActions, useAuthSelector} from '@store/features/auth';

const Login: FC = () => {
  const {isLoading} = useAuthSelector();
  const {login} = useAuthActions();

  return (
    <Card>
      <LoginForm isLoading={isLoading} onSubmit={login} />
    </Card>
  );
};

export default Login;
