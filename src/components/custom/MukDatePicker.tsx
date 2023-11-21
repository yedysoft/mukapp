import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import MukPicker from './MukPicker';
import {useServices} from '../../services';

type Date = {day: number; month: number; year: number};

type Props = {
  value?: Date;
  minYear?: number;
  maxYear?: number;
  onValueChange?: (value: Date) => void;
};

export default function MukDatePicker({value, minYear = 1970, maxYear, onValueChange}: Props) {
  const {api} = useServices();
  const [date, setDate] = useState<Date>(value ?? {day: 1, month: 1, year: 1996});
  const days = useMemo(() => {
    const m = new Date(date.year, date.month, 0).getDate();
    return api.helper.generateNumberArray(1, m);
  }, [date.year, date.month]);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years = useMemo(() => api.helper.generateNumberArray(minYear, maxYear ?? new Date().getFullYear()), []);

  const handleValueChanged = (name: string, value: number) => {
    setDate({...date, [name]: value});
  };

  useEffect(() => {
    onValueChange && onValueChange(date);
  }, [date]);

  return (
    <View style={{flexDirection: 'row'}}>
      <MukPicker<number> name="day" items={days} value={date.day} onValueChange={handleValueChanged} />
      <MukPicker<number> name="month" items={months} value={date.month} onValueChange={handleValueChanged} />
      <MukPicker<number> name="year" items={years} value={date.year} onValueChange={handleValueChanged} />
    </View>
  );
}
