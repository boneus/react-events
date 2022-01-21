import {FC} from 'react';
import {Link} from 'react-router-dom';
import {Card, Typography} from 'antd';

import {ERoutesMap} from '@configs';

interface IE404Props {
  title?: string;
  goTo?: ERoutesMap;
}

export const E404: FC<IE404Props> = ({
  title = 'Page not found',
  goTo = ERoutesMap.Events,
}) => {
  return (
    <Card>
      <Typography.Title>{title}</Typography.Title>
      <p>
        Go to <Link to={goTo}>home page</Link>
      </p>
    </Card>
  );
};
