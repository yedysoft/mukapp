import {SegmentedButtons, useTheme} from 'react-native-paper';
import {StyleProp, ViewStyle} from 'react-native';
import {Dispatch, SetStateAction} from 'react';
import {MukTheme} from '../../types';
import {useServices} from '../../services';

type Props = {
  value: string;
  handleChange: Dispatch<SetStateAction<string>>;
  buttons: {
    value: string;
    label: string;
  }[];
  style?: StyleProp<ViewStyle>;
  density?: 'regular' | 'small' | 'medium' | 'high';
};

export default function MukSegmented({value, handleChange, buttons, style, density}: Props) {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();

  return (
    <SegmentedButtons
      theme={{
        colors: {
          primary: colors.primary,
          secondaryContainer: api.helper.hexToRgba(colors.primary, 0.5),
          onSecondaryContainer: colors.secondary,
          outline: api.helper.hexToRgba(colors.primary, 0.1),
          onSurface: colors.outlineVariant,
        },
      }}
      density={density}
      style={style}
      value={value}
      onValueChange={handleChange}
      buttons={buttons}
    />
  );
}
