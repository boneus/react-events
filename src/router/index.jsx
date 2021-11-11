import {Suspense} from 'react';
import {useRoutes} from 'react-router';
import {useSelector} from 'react-redux';

import routes from './routes';
import Loader from '@components/Loader';

const AppRouter = () => {
  const {isAuthed} = useSelector((state) => state.auth);
  const appRoutes = useRoutes(routes(isAuthed));

  return <Suspense fallback={<Loader />}>{appRoutes}</Suspense>;
};

export default AppRouter;
