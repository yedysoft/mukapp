import {TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {Dispatch, SetStateAction} from 'react';
import {MukTheme} from '../../types';

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
  const {colors} = useTheme<MukTheme>();
  const active = index === activeIndex;

  return (
    <TouchableOpacity
      onPress={() => setActiveIndex(index)}
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        width: responsiveWidth(128),
        backgroundColor: active ? colors.primary : colors.shadow,
        paddingVertical: responsiveWidth(16),
        borderRadius: 16,
        gap: responsiveWidth(4),
      }}
    >
      <Text
        style={{fontSize: responsiveSize(20), fontWeight: '500', color: active ? colors.background : colors.secondary}}
      >
        {stat.value}
      </Text>
      <Text
        style={{fontSize: responsiveSize(14), fontWeight: '300', color: active ? colors.background : colors.secondary}}
      >
        {stat.label}
      </Text>
    </TouchableOpacity>
  );
}
