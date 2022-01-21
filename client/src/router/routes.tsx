import {lazy, LazyExoticComponent, FC} from 'react';
import {Navigate, RouteObject} from 'react-router';

import BasicLayout from '@pages/layouts/BasicLayout';
import MainLayout from '@pages/layouts/MainLayout';
import {ERoutesMap} from '@configs/router';

const Login: LazyExoticComponent<FC> = lazy<FC>(() => import('@pages/Login'));
const Events: LazyExoticComponent<FC> = lazy<FC>(() => import('@pages/Events'));
const E404: LazyExoticComponent<FC> = lazy<FC>(() => import('@pages/E404'));

const getRoutes: (isLoggedIn: boolean) => RouteObject[] = (isLoggedIn) => [
  {
    path: ERoutesMap.Events,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: isLoggedIn ? <Events /> : <Navigate to={ERoutesMap.Login} />,
      },
      {
        path: ERoutesMap.Login,
        element: !isLoggedIn ? <Login /> : <Navigate to={ERoutesMap.Events} />,
      },
    ],
  },
  {
    path: '*',
    element: <BasicLayout />,
    children: [{path: '*', element: <E404 />}],
  },
];

export default getRoutes;
