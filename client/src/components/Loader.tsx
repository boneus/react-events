import {FC} from 'react';
import {Layout, Spin} from 'antd';

export const Loader: FC = () => {
  return (
    <Layout.Content className='content contentMiddle contentCenter'>
      <Spin size='large' />
    </Layout.Content>
  );
};
