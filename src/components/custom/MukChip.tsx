import {Chip, useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';

type Props = {
  mode?: 'flat' | 'outlined' | undefined;
  icon?: string;
  label?: string;
};

export default function MukChip({icon, label, mode}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <Chip mode={mode} icon={icon} onPress={() => console.log('Pressed')}>
      {label}
    </Chip>
  );
}
