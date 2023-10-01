import {View} from 'react-native';
import ProfileStatsItem from './ProfileStatsItem';
import {responsiveWidth} from '../../utils/Responsive';
import {Dispatch, SetStateAction} from 'react';

const stats = [
  {
    value: '140k',
    label: 'Oylama',
  },
  {
    value: '31k',
    label: 'Takipçi',
  },
  {
    value: '62k',
    label: 'Takip edilen',
  },
];

type Props = {
  activeIndex: number,
  setActiveIndex: Dispatch<SetStateAction<number>>,
};

export default function ProfileStats({activeIndex, setActiveIndex}: Props) {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: responsiveWidth(8)}}>
      {stats.map((stat, index) => {
        return (
          <ProfileStatsItem key={index} stat={stat} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
        );
      })}
    </View>
  );
}
