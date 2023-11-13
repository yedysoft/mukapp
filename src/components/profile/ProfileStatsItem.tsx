import {TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {Dispatch, SetStateAction} from 'react';

type Props = {
  stat: {
    value: string;
    label: string;
  };
  index: number;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
};

export default function ProfileStatsItem({stat, index, activeIndex, setActiveIndex}: Props) {
  const {colors} = useTheme();
  const active = index == activeIndex;

  return (
    <TouchableOpacity
      onPress={() => setActiveIndex(index)}
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        width: responsiveWidth(128),
        backgroundColor: colors.backdrop,
        paddingVertical: responsiveWidth(16),
        borderRadius: 16,
        gap: responsiveWidth(4),
        borderWidth: 0.5,
        borderColor: active ? colors.primary : colors.background,
      }}
    >
      <Text style={{fontSize: responsiveSize(18), fontWeight: 'bold', color: colors.primary}}>{stat.value}</Text>
      <Text style={{fontSize: responsiveSize(14), fontWeight: 'bold', color: colors.onSurfaceVariant}}>
        {stat.label}
      </Text>
    </TouchableOpacity>
  );
}
