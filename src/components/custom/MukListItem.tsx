import {useTheme} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';
import {ReactNode} from 'react';

type Props = {
  onPress?: () => void;
  children?: ReactNode;
};

export default function MukListItem({onPress, children}: Props) {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        gap: responsiveWidth(16),
        paddingHorizontal: responsiveWidth(16),
        paddingVertical: responsiveWidth(8),
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}
