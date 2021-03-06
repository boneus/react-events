import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {Button, Form, Input, Row, Select} from 'antd';

import DatePicker from '@components/DatePicker';
import {validationRules} from '@utils/forms';
import {formatDate} from '@utils/dates';

const EventForm = ({guests, onSubmit, author, selectedDate, isLoading}) => {
  const [event, setEvent] = useState({
    date: formatDate(selectedDate.toDate()),
    description: '',
    guest: '',
    author: author.username,
  });
  const [form] = Form.useForm();

  useEffect(() => {
    setEvent({...event, date: formatDate(selectedDate.toDate())});
  }, [selectedDate]);

  useEffect(() => {
    form.setFieldsValue({...event, date: selectedDate});
  }, [selectedDate, event]);

  const selectDate = (date) => {
    if (date) setEvent({...event, date: formatDate(date.toDate())});
  };

  const submit = async () => {
    await onSubmit(event);
    setEvent({
      date: formatDate(selectedDate.toDate()),
      description: '',
      guest: '',
      author: author.username,
    });
  };

  return (
    <Form onFinish={submit} form={form}>
      <Form.Item
        label='Event description'
        name='description'
        rules={[validationRules.required()]}
      >
        <Input
          value={event.description}
          onChange={(e) => setEvent({...event, description: e.target.value})}
        />
      </Form.Item>

      <Form.Item
        label='Event date'
        name='date'
        rules={[validationRules.required(), validationRules.isDateAfter()]}
      >
        <DatePicker
          onChange={(date) => selectDate(date)}
          value={selectedDate}
          disabledDate={(current) => current < dayjs().subtract(1, 'day')}
        />
      </Form.Item>

      <Form.Item
        label='Guest'
        name='guest'
        rules={[validationRules.required()]}
      >
        <Select onChange={(guest) => setEvent({...event, guest})}>
          {guests.map(({username}) => (
            <Select.Option key={username} value={username}>
              {username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Row justify='end'>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Add
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

EventForm.propTypes = {
  author: PropTypes.shape({username: PropTypes.string}).isRequired,
  selectedDate: PropTypes.instanceOf(dayjs),
  guests: PropTypes.arrayOf(PropTypes.shape({username: PropTypes.string})),
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

EventForm.defaultProps = {
  selectedDate: dayjs(),
  guests: [],
  isLoading: false,
};

export default EventForm;
