import React, {memo, useMemo} from 'react';
import {View} from 'react-native';
import MukPicker from './MukPicker';
import {services, useServices} from '../../services';

type DateType = {day: number; month: number; year: number};

type Props = {
  name: string;
  value?: string;
  minYear?: number;
  maxYear?: number;
  onValueChange?: (name: string, value: string) => void;
};

const nowYear = new Date().getFullYear();

const strToDate = (str: string | undefined): DateType => {
  if (str) {
    const parts = str.split('.');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);
      return {day: day, month: month, year: year};
    }
  }
  return {day: 1, month: 1, year: nowYear - 18};
};

const dateToStr = (date: DateType): string => {
  const day = services.api.helper.formatNumberWithLength(date.day, 2);
  const month = services.api.helper.formatNumberWithLength(date.month, 2);
  return `${day}.${month}.${date.year}`;
};

const MukDatePickerComp = ({name, value, minYear = 1950, maxYear = nowYear, onValueChange}: Props) => {
  console.log('MukDatePickerCompRender', name);
  const {api} = useServices();
  let date: DateType = strToDate(value);
  const day = useMemo(() => new Date(date.year, date.month, 0).getDate(), [date.year, date.month]);
  const days = useMemo(() => api.helper.generateNumberArray(1, day), [day]);
  const months = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], []);
  const years = useMemo(() => api.helper.generateNumberArray(minYear, maxYear), [minYear, maxYear]);

  const handleValueChanged = (key: string, value: number) => {
    date = {...date, [key]: value};
    onValueChange && onValueChange(name, dateToStr(date));
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <MukPicker<number> name="day" items={days} value={date.day} onValueChange={handleValueChanged} />
      <MukPicker<number> name="month" items={months} value={date.month} onValueChange={handleValueChanged} />
      <MukPicker<number> name="year" items={years} value={date.year} onValueChange={handleValueChanged} />
    </View>
  );
};

MukDatePickerComp.defaultProps = {
  minYear: 1950,
  maxYear: nowYear,
};

const MukDatePicker = memo(MukDatePickerComp);
export default MukDatePicker;
