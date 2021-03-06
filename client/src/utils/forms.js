import dayjs from 'dayjs';

export const validationRules = {
  required: (message = 'Required field') => ({
    required: true,
    message,
  }),
  isDateAfter: (message = 'No past dates') => () => ({
    validator(_, value) {
      const today = dayjs();
      if (value.isSame(today, 'day') || value.isAfter(today, 'day')) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(message));
    },
  }),
};
