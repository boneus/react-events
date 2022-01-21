import {FC} from 'react';
import {NavigateFunction} from 'react-router-dom';
import {Layout, Row, Menu} from 'antd';

import {ERoutesMap} from '@configs';
import {IUser} from '@models';

interface IHeaderProps {
  user: IUser;
  isAuthed?: boolean;
  logout: () => void;
  navigate: NavigateFunction;
}

export const Header: FC<IHeaderProps> = ({
  user,
  isAuthed = false,
  logout,
  navigate,
}) => {
  return (
    <Layout.Header>
      <Row justify='end'>
        {isAuthed ? (
          <>
            <div style={{color: 'white'}}>{user.username}</div>
            <Menu theme='dark' mode='horizontal' selectable={false}>
              <Menu.Item onClick={logout} key={1}>
                Logout
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu theme='dark' mode='horizontal' selectable={false}>
            <Menu.Item onClick={() => navigate(ERoutesMap.Login)} key={1}>
              Login
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  );
};
