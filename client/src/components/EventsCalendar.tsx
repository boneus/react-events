import {FC} from 'react';
import dayjs from 'dayjs';

import {IEvent} from '@models';
import {Calendar} from '@components';
import {formatDate} from '@utils/dates';

interface IEventsCalendarProps {
  events?: IEvent[];
  onSelect: (date: dayjs.Dayjs) => void;
}

export const EventsCalendar: FC<IEventsCalendarProps> = ({
  events = [],
  onSelect,
}) => {
  const dateCellRender: FC<dayjs.Dayjs> = (value) => {
    const date = formatDate(value.toDate());
    const currentDayEvents = events.filter((event) => event.date === date);
    return (
      <ul className='events'>
        {currentDayEvents.map(({id, description}) => (
          <li key={id}>{description}</li>
        ))}
      </ul>
    );
  };

  return (
    <Calendar
      dateCellRender={dateCellRender}
      onSelect={onSelect}
      disabledDate={(current) => current < dayjs().subtract(1, 'day')}
    />
  );
};
