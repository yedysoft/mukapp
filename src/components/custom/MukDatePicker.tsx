import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import MukPicker from './MukPicker';
import {services, useServices} from '../../services';

type Date = {day: number; month: number; year: number};

type Props = {
  name: string;
  value?: string;
  minYear?: number;
  maxYear?: number;
  onValueChange?: (name: string, value: string) => void;
};

const nowYear = new Date().getFullYear();

function strToDate(str: string | undefined): Date {
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
}

function dateToStr(date: Date): string {
  const day = services.api.helper.formatNumberWithLength(date.day, 2);
  const month = services.api.helper.formatNumberWithLength(date.month, 2);
  return `${day}.${month}.${date.year}`;
}

export default function MukDatePicker({name, value, minYear = 1970, maxYear = nowYear, onValueChange}: Props) {
  console.log('MukDatePickerRender', value);
  const {api} = useServices();
  const [date, setDate] = useState<Date>(strToDate(value));
  const days = useMemo(() => {
    const m = new Date(date.year, date.month, 0).getDate();
    console.log(date.year, date.month, m);
    return api.helper.generateNumberArray(1, m);
  }, [date.year, date.month]);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years = useMemo(() => api.helper.generateNumberArray(minYear, maxYear), [minYear, maxYear]);

  const handleValueChanged = (key: string, value: number) => {
    const newDate: Date = {...date, [key]: value};
    console.log('MukDatePicker', 'newDate', newDate);
    setDate(newDate);
    onValueChange && onValueChange(name, dateToStr(newDate));
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <MukPicker<number> name="day" items={days} value={date.day} onValueChange={handleValueChanged} />
      <MukPicker<number> name="month" items={months} value={date.month} onValueChange={handleValueChanged} />
      <MukPicker<number> name="year" items={years} value={date.year} onValueChange={handleValueChanged} />
    </View>
  );
}
