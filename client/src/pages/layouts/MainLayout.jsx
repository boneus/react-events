import {Outlet, useNavigate} from 'react-router';
import {Layout} from 'antd';

import Header from '@components/Header';
import {useAuthSelector, useAuthActions} from '@store/features/auth';

const MainLayout = () => {
  const navigate = useNavigate();
  const {isAuthed, user} = useAuthSelector();
  const {logout} = useAuthActions();

  return (
    <>
      <Header
        user={user}
        isAuthed={isAuthed}
        logout={logout}
        navigate={navigate}
      />
      <Layout.Content className='content contentMiddle contentCenter'>
        <Outlet />
      </Layout.Content>
    </>
  );
};

export default MainLayout;
