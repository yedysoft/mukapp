import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {View} from 'react-native';
import MukIcon from '../custom/MukIcon';
import Token from '../user/Token';
import MukProgressBar from '../custom/MukProgressBar';
import MukButton from '../custom/MukButton';
import {useState} from 'react';

export default function TasksListItem() {
  const {colors} = useTheme();
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <View
      style={{
        backgroundColor: colors.backdrop,
        borderRadius: 16,
        gap: responsiveWidth(16),
        padding: responsiveWidth(16),
      }}
    >
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <MukIcon scale={0.8} color={colors.outline} icon={'newspaper-variant-outline'} />
        <View style={{gap: responsiveWidth(4), width: responsiveWidth(240)}}>
          <Text numberOfLines={1} style={{fontSize: responsiveSize(16), fontWeight: '600'}}>
            Task Title (1/3)
          </Text>
          <Text numberOfLines={2} style={{fontSize: responsiveSize(14)}}>
            Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
          </Text>
        </View>
        <Token customValue={'10'} />
      </View>
      {isCompleted ? (
        <MukButton label={'Tamamlandı'} onPress={() => console.log('tamamlandi')} />
      ) : (
        <MukProgressBar progress={1 / 3} style={{height: responsiveWidth(16)}} />
      )}
    </View>
  );
}
