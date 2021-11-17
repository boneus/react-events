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

  const {user} = useAuthSelector((state) => state.auth);
  const {guests, events} = useEventsSelector((state) => state.events);
  const {fetchGuests, addEvent, fetchEvents} = useEventsActions();

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  const onDateSelect = (date) => {
    setSelectedDate(date);
    setIsModalVisible(true);
  };

  const addNewEvent = (event) => {
    addEvent(event);
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
        <EventForm guests={guests} onSubmit={addNewEvent} author={user} selectedDate={selectedDate}/>
      </Modal>
    </>
  );
};

export default Events;
