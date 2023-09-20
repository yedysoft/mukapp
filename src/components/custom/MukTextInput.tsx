import {TextInput} from "react-native-paper";
import {StyleProp, ViewStyle} from "react-native";

type Props = {
  label?: string,
  value?: string,
  onChange?: () => {},
  style?: StyleProp<ViewStyle>,
  outlineStyle?: StyleProp<ViewStyle>
}

export default function MukTextInput({label, value, onChange, style, outlineStyle}: Props) {
  return (
    <TextInput
      label={label}
      mode={'outlined'}
      value={value}
      onChangeText={onChange}
      outlineStyle={[{borderRadius: 16}, outlineStyle]}
      style={[{width: '100%', color: 'white', backgroundColor: 'transparent'}, style]}
    />
  );
}
