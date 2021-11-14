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

export default EventsCalendar;
