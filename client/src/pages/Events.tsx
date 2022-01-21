import {FC, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {Modal} from 'antd';

import {TNewEvent} from '@models';
import {EventsCalendar, EventForm} from '@components';
import {useAuthSelector} from '@store/features/auth';
import {useEventsActions, useEventsSelector} from '@store/features/events';

const Events: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

  const {user} = useAuthSelector();
  const {guests, events, isLoading} = useEventsSelector();
  const {fetchGuests, addUserEvent, fetchEvents} = useEventsActions();

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  const onDateSelect: (date: dayjs.Dayjs) => void = (date) => {
    setSelectedDate(date);
    setIsModalVisible(true);
  };

  const addNewEvent: (event: TNewEvent) => void = (event) => {
    addUserEvent(event);
    setIsModalVisible(false);
  };

  return (
    <>
      <EventsCalendar events={events} onSelect={onDateSelect} />
      <Modal
        title='Add event'
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <EventForm
          guests={guests}
          onSubmit={addNewEvent}
          author={user}
          selectedDate={selectedDate}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

export default Events;
