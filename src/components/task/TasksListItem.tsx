import {useTheme} from '../../hooks';
import {responsiveWidth} from '../../utils/util';
import {View} from 'react-native';
import {YedyButton, YedyIcon, YedyProgressBar, YedyText} from '../custom';
import Token from '../user/Token';
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
        <YedyIcon scale={0.8} color={colors.outline} icon={'format-horizontal-align-left'} />
        <View style={{gap: responsiveWidth(4), width: responsiveWidth(240)}}>
          <YedyText numberOfLines={1} type={'bold'} size={16}>
            Task Title (1/3)
          </YedyText>
          <YedyText numberOfLines={2} size={14}>
            Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
          </YedyText>
        </View>
        <Token customValue={10} />
      </View>
      {isCompleted ? (
        <YedyButton label={'Tamamlandı'} onPress={() => console.log('tamamlandi')} />
      ) : (
        <YedyProgressBar progress={1 / 3} style={{height: responsiveWidth(16)}} />
      )}
    </View>
  );
}
