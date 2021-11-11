import {Layout} from 'antd';
import 'antd/dist/antd.css';

import AppRouter from '@router';
import './App.css';

function App() {
  return (
    <Layout className='layout'>
      <AppRouter />
    </Layout>
  );
}

export default App;
