import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Card, Typography} from 'antd';

import {routesMap} from '@router/routes';

const E404 = ({title, goTo}) => {
  return (
    <Card>
      <Typography.Title>{title}</Typography.Title>
      <p>
        Go to <Link to={goTo}>home page</Link>
      </p>
    </Card>
  );
};

E404.propTypes = {
  title: PropTypes.string,
  goTo: PropTypes.oneOf(Object.values(routesMap))
};

E404.defaultProps = {
  title: 'Page not found',
  goTo: routesMap.events
};

export default E404;
