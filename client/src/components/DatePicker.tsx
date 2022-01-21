import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker, {
  PickerDateProps,
  PickerProps,
  PickerTimeProps,
  RangePickerProps,
} from 'antd/es/date-picker/generatePicker';
import {Dayjs} from 'dayjs';
import {PickerComponentClass} from 'antd/es/date-picker/generatePicker/interface';

export const DatePicker: PickerComponentClass<PickerProps<Dayjs>, unknown> & {
  WeekPicker: PickerComponentClass<
    Omit<PickerDateProps<Dayjs>, 'picker'>,
    unknown
  >;
  MonthPicker: PickerComponentClass<
    Omit<PickerDateProps<Dayjs>, 'picker'>,
    unknown
  >;
  YearPicker: PickerComponentClass<
    Omit<PickerDateProps<Dayjs>, 'picker'>,
    unknown
  >;
  RangePicker: PickerComponentClass<RangePickerProps<Dayjs>, unknown>;
  TimePicker: PickerComponentClass<
    Omit<PickerTimeProps<Dayjs>, 'picker'>,
    unknown
  >;
  QuarterPicker: PickerComponentClass<
    Omit<PickerTimeProps<Dayjs>, 'picker'>,
    unknown
  >;
} = generatePicker<Dayjs>(dayjsGenerateConfig);
