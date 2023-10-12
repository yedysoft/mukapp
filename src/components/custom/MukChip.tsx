import {Chip, useTheme} from 'react-native-paper';

type Props = {
  mode?: 'flat' | 'outlined' | undefined;
  icon?: string;
  label?: string;
};

export default function MukChip({icon, label, mode}: Props) {
  const theme = useTheme();

  return (
    <Chip mode={mode} icon={icon} onPress={() => console.log('Pressed')}>
      {label}
    </Chip>
  );
}
