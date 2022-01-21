import {FC} from 'react';
import {CalendarProps} from 'antd';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generateCalendar from 'antd/es/calendar/generateCalendar';
import {Dayjs} from 'dayjs';

export const Calendar: FC<CalendarProps<Dayjs>> =
  generateCalendar<Dayjs>(dayjsGenerateConfig);
