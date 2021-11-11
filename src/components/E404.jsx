import {Link} from 'react-router-dom';
import {Card, Typography} from 'antd';

const {Title} = Typography;

const E404 = ({title = 'Page not found', goTo = '/'}) => {
  return (
    <Card>
      <Title>{title}</Title>
      <p>
        Go to <Link to={goTo}>home page</Link>
      </p>
    </Card>
  );
};

export default E404;
