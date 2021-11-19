import {Outlet} from 'react-router';
import {Layout} from 'antd';

const BasicLayout = () => {
  return (
    <Layout className="layout">
      <Layout.Content className="content contentMiddle contentCenter">
        <Outlet/>
      </Layout.Content>
    </Layout>
  );
};

export default BasicLayout;
