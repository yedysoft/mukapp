import {TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import {responsiveWidth} from '../../utils/util';
import {Dispatch, SetStateAction} from 'react';
import {MukTheme} from '../../types';
import YedyText from '../custom/YedyText';

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
        flex: 1,
        backgroundColor: active ? colors.primary : colors.shadow,
        paddingVertical: responsiveWidth(16),
        borderRadius: 16,
        gap: responsiveWidth(4),
      }}
    >
      <YedyText fontType={'bold'} fontSize={20} style={{color: active ? colors.dark : colors.secondary}}>
        {stat.value}
      </YedyText>
      <YedyText fontSize={14} style={{color: active ? colors.dark : colors.secondary}}>
        {stat.label}
      </YedyText>
    </TouchableOpacity>
  );
}
