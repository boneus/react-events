import {lazy} from 'react';
import {Navigate} from 'react-router';

import BasicLayout from '@pages/layouts/BasicLayout';
import MainLayout from '@pages/layouts/MainLayout';
import {routesMap} from '@configs/router';

const Login = lazy(() => import('@pages/Login'));
const Events = lazy(() => import('@pages/Events'));
const E404 = lazy(() => import('@pages/E404'));


export default (isLoggedIn) => [
  {
    path: routesMap.events,
    element: <MainLayout/>,
    children: [
      {
        index: true,
        element: isLoggedIn ? <Events/> : <Navigate to={routesMap.login}/>,
      },
      {
        path: routesMap.login,
        element: !isLoggedIn ? <Login/> : <Navigate to={routesMap.events}/>,
      },
    ],
  },
  {
    path: '*',
    element: <BasicLayout/>,
    children: [{index: true, element: <E404/>}],
  },
];
