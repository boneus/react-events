import {FC, useEffect} from 'react';
import {Layout} from 'antd';
import 'antd/dist/antd.css';

import {useAuthActions} from '@store/features/auth';
import AppRouter from '@router';
import './App.css';

const App: FC = () => {
  const {setUser, setIsAuthed} = useAuthActions();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setUser({username: localStorage.getItem('username') || ''});
      setIsAuthed(true);
    }
  }, []);

  return (
    <Layout className='layout'>
      <AppRouter />
    </Layout>
  );
};

export default App;
