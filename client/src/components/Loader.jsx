import {Layout, Spin} from 'antd';

const Loader = () => {
  return (
    <Layout.Content className='content contentMiddle contentCenter'>
      <Spin size='large' />
    </Layout.Content>
  );
};

export default Loader;
