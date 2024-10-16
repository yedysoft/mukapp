import React, {memo, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import YedyPicker from './YedyPicker';
import {services, useServices} from '../../../services';
import {responsiveWidth} from '../../../utils/util';

type DateType = {day: number; month: number; year: number};

type Props = {
  name: string;
  value?: string;
  minYear?: number;
  maxYear?: number;
  onValueChange?: (name: string, value: string, prettyValue?: string) => void;
};

const nowYear = new Date().getFullYear();

const strToDate = (str: string | undefined): DateType => {
  if (str) {
    const parts = str.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      return {day, month, year};
    }
  }
  return {day: 1, month: 1, year: nowYear - 18};
};

const dateToStr = (date: DateType, format: 'day.month.Year' | 'year-month-day'): string => {
  const day = services.api.helper.formatNumberWithLength(date.day, 2);
  const month = services.api.helper.formatNumberWithLength(date.month, 2);
  if (format === 'day.month.Year') {
    return `${day}.${month}.${date.year}`;
  } else {
    return `${date.year}-${month}-${day}`;
  }
};

const DatePickerComp = ({name, value, minYear = 1950, maxYear = nowYear, onValueChange}: Props) => {
  const {api} = useServices();
  const date = useRef<DateType>(strToDate(value));
  const [changedLastDay, setChangedLastDay] = useState<boolean>(false);
  const day = useMemo(() => new Date(date.current.year, date.current.month, 0).getDate(), [changedLastDay]);
  const days = useMemo(() => api.helper.generateNumberArray(1, day), [day]);
  const months = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], []);
  const years = useMemo(() => api.helper.generateNumberArray(minYear, maxYear), [minYear, maxYear]);

  const handleValueChanged = (key: string, value: number) => {
    date.current = {...date.current, [key]: value};
    if (new Date(date.current.year, date.current.month, 0).getDate() !== day) {
      setChangedLastDay(v => !v);
    }
    onValueChange &&
      onValueChange(name, dateToStr(date.current, 'year-month-day'), dateToStr(date.current, 'day.month.Year'));
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <YedyPicker<number>
        name="day"
        items={days}
        value={value ? date.current.day : undefined}
        itemWidth={responsiveWidth(70)}
        onValueChange={handleValueChanged}
      />
      <YedyPicker<number>
        name="month"
        items={months}
        value={value ? date.current.month : undefined}
        itemWidth={responsiveWidth(70)}
        onValueChange={handleValueChanged}
      />
      <YedyPicker<number>
        name="year"
        items={years}
        value={value ? date.current.year : undefined}
        itemWidth={responsiveWidth(70)}
        onValueChange={handleValueChanged}
      />
    </View>
  );
};

const YedyDatePicker = memo(DatePickerComp, (prevProps, nextProps) =>
  services.api.helper.isEqual(prevProps, nextProps),
);
export default YedyDatePicker;
