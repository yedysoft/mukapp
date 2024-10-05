import {useTheme} from 'react-native-paper';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {MukTheme} from '../../types';
import {responsiveWidth} from '../../utils/util';
import YedyText from './YedyText';

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  buttons: {
    value: string;
    label: string;
  }[];
  style?: StyleProp<ViewStyle>;
};

export default function MukSegmented({value, onValueChange, buttons, style}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: responsiveWidth(40),
      }}
    >
      {buttons.map((button, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => onValueChange(button.value)}
            style={[
              {
                borderTopRightRadius: i === buttons.length - 1 ? 100 : 0,
                borderBottomRightRadius: i === buttons.length - 1 ? 100 : 0,
                borderTopLeftRadius: i === 0 ? 100 : 0,
                borderBottomLeftRadius: i === 0 ? 100 : 0,
                borderWidth: 1,
                borderColor: button.value === value ? colors.primary : colors.shadow,
                backgroundColor: button.value === value ? colors.primary : 'transparent',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              },
              style,
            ]}
          >
            <YedyText style={{color: button.value === value ? colors.background : colors.secondary}}>
              {button.label}
            </YedyText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
