import {Suspense} from 'react';
import {useRoutes} from 'react-router';

import {useAuthSelector} from '@store/features/auth';
import routes from '@router/routes';
import Loader from '@components/Loader';

const AppRouter = () => {
  const {isAuthed} = useAuthSelector();
  const appRoutes = useRoutes(routes(isAuthed));

  return <Suspense fallback={<Loader/>}>{appRoutes}</Suspense>;
};

export default AppRouter;
