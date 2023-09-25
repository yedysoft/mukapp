import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import {FlatList, View} from 'react-native';
import MukProfileButton from '../custom/MukProfileButton';

const profileData = [
  {
    count: '140k',
    title: 'Oylama',
  },
  {
    count: '31k',
    title: 'Takipçi',
  },
  {
    count: '62k',
    title: 'Takip edilen',
  },
];

export default function MukFallowerButtons() {
  return (
    <View
      style={{
        marginTop: responsiveHeight(5),
        maxHeight: responsiveHeight(80),
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <FlatList
        horizontal
        data={profileData}
        renderItem={item => (
          <View style={{justifyContent: 'center', display: 'flex', margin: responsiveWidth(20)}}>
            <View>
              <MukProfileButton
                label={item.item.title}
                labelData={item.item.count}
                buttonStyle={{height: responsiveHeight(80), backgroundColor: 'transparent', display: 'flex', justifyContent: 'center'}}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}
