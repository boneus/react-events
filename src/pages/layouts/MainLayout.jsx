import {Outlet} from 'react-router';
import {Layout} from 'antd';

import Header from '@components/Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Layout.Content className='content contentMiddle contentCenter'>
        <Outlet />
      </Layout.Content>
    </>
  );
};

export default MainLayout;
