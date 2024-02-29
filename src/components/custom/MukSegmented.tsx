import {Text, useTheme} from 'react-native-paper';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Dispatch, SetStateAction} from 'react';
import {MukTheme} from '../../types';
import {responsiveSize, responsiveWidth} from '../../utils/util';

type Props = {
  value: string;
  handleChange: Dispatch<SetStateAction<string>>;
  buttons: {
    value: string;
    label: string;
  }[];
  style?: StyleProp<ViewStyle>;
};

export default function MukSegmented({value, handleChange, buttons, style}: Props) {
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
            onPress={() => handleChange(button.value)}
            style={[
              {
                borderTopRightRadius: i === 2 ? 100 : 0,
                borderBottomRightRadius: i === 2 ? 100 : 0,
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
            <Text
              style={{
                fontSize: responsiveSize(15),
                fontWeight: '400',
                color: button.value === value ? colors.background : colors.secondary,
              }}
            >
              {button.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
