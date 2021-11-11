import {useNavigate} from 'react-router';
import {useSelector} from 'react-redux';
import {Layout, Row, Menu} from 'antd';

const Header = () => {
  const navigate = useNavigate();
  const {isAuthed} = useSelector((state) => state.auth);

  return (
    <Layout.Header>
      <Row justify='end'>
        {isAuthed ? (
          <>
            <div style={{color: 'white'}}>Boneus</div>
            <Menu theme='dark' mode='horizontal' selectable={false}>
              <Menu.Item onClick={() => console.log('logout')} key={1}>
                Logout
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu theme='dark' mode='horizontal' selectable={false}>
            <Menu.Item onClick={() => navigate('/login')} key={1}>
              Login
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Header;
