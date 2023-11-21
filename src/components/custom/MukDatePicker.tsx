import React, {useState} from 'react';
import {View} from 'react-native';
import MukPicker from './MukPicker';

type Date = {day: number; month: number; year: number};

type Props = {
  value?: Date;
  onValueChange?: (value: Date) => void;
};

export default function MukDatePicker({value, onValueChange}: Props) {
  const [date, setDate] = useState<Date>(value ?? {day: 1, month: 1, year: 1996});

  const handleValueChanged = (name: string, value: number) => {
    const newDate: Date = {...date, [name]: value};
    setDate(newDate);
    onValueChange && onValueChange(newDate);
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <MukPicker<number>
        name="day"
        items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        defaultValue={date.day}
        onValueChange={handleValueChanged}
      />
      <MukPicker<number>
        name="month"
        items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        defaultValue={date.month}
        onValueChange={handleValueChanged}
      />
      <MukPicker<number>
        name="year"
        items={[1996, 1997, 1998, 1999, 2000]}
        defaultValue={date.year}
        onValueChange={handleValueChanged}
      />
    </View>
  );
}
