import {FC, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {Button, Form, Input, Row, Select} from 'antd';

import {IUser, TNewEvent} from '@models';
import {DatePicker} from '@components';
import {validationRules} from '@utils/forms';
import {formatDate} from '@utils/dates';

interface IEventFormProps {
  author: IUser;
  selectedDate?: dayjs.Dayjs;
  guests?: IUser[];
  onSubmit: (event: TNewEvent) => void;
  isLoading?: boolean;
}

export const EventForm: FC<IEventFormProps> = ({
  guests = [],
  onSubmit,
  author,
  selectedDate = dayjs(),
  isLoading = false,
}) => {
  const [event, setEvent] = useState<TNewEvent>({
    date: formatDate(selectedDate.toDate()),
    description: '',
    guest: '',
    author: author.username,
  });
  const [form] = Form.useForm();

  useEffect(() => {
    setEvent({...event, date: formatDate(selectedDate.toDate())});
    form.setFieldsValue({...event, date: selectedDate});
  }, [selectedDate]);

  const selectDate: (date: dayjs.Dayjs | null) => void = (date) => {
    if (date) setEvent({...event, date: formatDate(date.toDate())});
  };

  const submit = () => {
    onSubmit(event);
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
