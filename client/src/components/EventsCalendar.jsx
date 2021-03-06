import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import Calendar from '@components/Calendar';
import {formatDate} from '@utils/dates';

const EventsCalendar = ({events, onSelect}) => {
  const dateCellRender = (value) => {
    const date = formatDate(value.toDate());
    const currentDayEvents = events.filter((event) => event.date === date);
    return (
      <ul className="events">
        {currentDayEvents.map((event, index) => (
          <li key={index}>
            {event.description}
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} onSelect={onSelect}
                   disabledDate={current => current < dayjs().subtract(1, 'day')}/>;
};

EventsCalendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    description: PropTypes.string,
    guest: PropTypes.string,
    date: PropTypes.string
  })),
  onSelect: PropTypes.func.isRequired
};

EventsCalendar.defaultProps = {
  events: []
};

export default EventsCalendar;
