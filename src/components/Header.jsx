import PropTypes from 'prop-types';
import {Layout, Row, Menu} from 'antd';

import {routesMap} from '@router/routes';

const Header = ({user, isAuthed, logout, navigate}) => {
  return (
    <Layout.Header>
      <Row justify="end">
        {isAuthed ? (
          <>
            <div style={{color: 'white'}}>{user.username}</div>
            <Menu theme="dark" mode="horizontal" selectable={false}>
              <Menu.Item onClick={logout} key={1}>
                Logout
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item onClick={() => navigate(routesMap.login)} key={1}>
              Login
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
  }).isRequired,
  isAuthed: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
};

Header.defaultProps = {
  isAuthed: false
};

export default Header;
