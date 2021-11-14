import {useNavigate} from 'react-router';
import {Layout, Row, Menu} from 'antd';

import {useAuthSelector, useAuthActions} from '@store/ducks/features/auth';
import {routesMap} from '@router/routes';

const Header = () => {
  const navigate = useNavigate();
  const {isAuthed, user} = useAuthSelector();
  const {logout} = useAuthActions()

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
            <Menu.Item onClick={() => navigate(routesMap.login)} key={1}>
              Login
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Header;
