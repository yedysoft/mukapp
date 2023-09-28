import {View} from 'react-native';
import ProfileStatsItem from './ProfileStatsItem';
import {responsiveHeight} from '../../utils/Responsive';

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

export default function ProfileStats() {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      {stats.map((stat, index) => {
        return (
          <ProfileStatsItem key={index} stat={stat}/>
        );
      })}
    </View>
  );
}
