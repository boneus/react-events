import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {Modal} from 'antd';

import {useAuthSelector} from '@store/features/auth';
import {useEventsActions, useEventsSelector} from '@store/features/events';
import EventsCalendar from '@components/EventsCalendar';
import EventForm from '@components/EventForm';

const Events = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const {user} = useAuthSelector();
  const {guests, events, isLoading} = useEventsSelector();
  const {fetchGuests, addUserEvent, fetchEvents} = useEventsActions();

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  const onDateSelect = (date) => {
    setSelectedDate(date);
    setIsModalVisible(true);
  };

  const addNewEvent = (event) => {
    addUserEvent(event);
    setIsModalVisible(false);
  };

  return (
    <>
      <EventsCalendar events={events} onSelect={onDateSelect}/>
      <Modal
        title="Add event"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <EventForm guests={guests} onSubmit={addNewEvent} author={user} selectedDate={selectedDate} isLoading={isLoading}/>
      </Modal>
    </>
  );
};

export default Events;
