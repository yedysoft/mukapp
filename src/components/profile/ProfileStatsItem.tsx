import {TouchableOpacity} from 'react-native';
import {useTheme} from '../../hooks';
import {responsiveWidth} from '../../utils/util';
import {Dispatch, SetStateAction} from 'react';
import {YedyText} from '../custom';

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
      <YedyText type={'bold'} size={20} color={active ? colors.dark : colors.secondary}>
        {stat.value}
      </YedyText>
      <YedyText size={14} color={active ? colors.dark : colors.secondary}>
        {stat.label}
      </YedyText>
    </TouchableOpacity>
  );
}
