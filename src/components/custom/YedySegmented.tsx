import {useTheme} from '../../hooks';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import YedyText from './YedyText';
import {responsiveWidth} from '../../utils/util';

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  buttons: {
    value: string;
    label: string;
  }[];
  style?: StyleProp<ViewStyle>;
};

export default ({value, onValueChange, buttons, style}: Props) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        //height: responsiveHeight(35),
      }}
    >
      {buttons.map((button, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => onValueChange(button.value)}
            style={[
              {
                paddingVertical: responsiveWidth(8),
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
            <YedyText type={'bold'} size={13} color={button.value === value ? colors.dark : colors.secondary}>
              {button.label}
            </YedyText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
