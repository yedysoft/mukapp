import useTheme from '../../hooks/useTheme';
import {responsiveWidth} from '../../utils/util';
import {View} from 'react-native';
import YedyIcon from '../custom/YedyIcon';
import Token from '../user/Token';
import MukProgressBar from '../custom/YedyProgressBar';
import MukButton from '../custom/MukButton';
import {useState} from 'react';
import YedyText from '../custom/YedyText';

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
        <YedyIcon scale={0.8} color={colors.outline} icon={'format-horizontal-align-left'} />
        <View style={{gap: responsiveWidth(4), width: responsiveWidth(240)}}>
          <YedyText numberOfLines={1} fontType={'bold'} fontSize={16}>
            Task Title (1/3)
          </YedyText>
          <YedyText numberOfLines={2} fontSize={14}>
            Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
          </YedyText>
        </View>
        <Token customValue={10} />
      </View>
      {isCompleted ? (
        <MukButton label={'Tamamlandı'} onPress={() => console.log('tamamlandi')} />
      ) : (
        <MukProgressBar progress={1 / 3} style={{height: responsiveWidth(16)}} />
      )}
    </View>
  );
}
