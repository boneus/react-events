import {Suspense, FC} from 'react';
import {useRoutes} from 'react-router';

import {Loader} from '@components';
import {useAuthSelector} from '@store/features/auth';
import getRoutes from '@router/routes';

const AppRouter: FC = () => {
  const {isAuthed} = useAuthSelector();
  const appRoutes = useRoutes(getRoutes(isAuthed));

  return <Suspense fallback={<Loader />}>{appRoutes}</Suspense>;
};

export default AppRouter;
