import {Link} from 'react-router-dom';
import {Card, Typography} from 'antd';

import {routesMap} from '@router/routes';

const E404 = ({title = 'Page not found', goTo = routesMap.events}) => {
  return (
    <Card>
      <Typography.Title>{title}</Typography.Title>
      <p>
        Go to <Link to={goTo}>home page</Link>
      </p>
    </Card>
  );
};

export default E404;
