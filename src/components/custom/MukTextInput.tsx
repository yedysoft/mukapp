import {TextInput, useTheme} from 'react-native-paper';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {useState} from 'react';
import {useServices} from '../../services';

type Props = {
  name: string;
  label?: string;
  value?: string;
  hideText?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onChange?: (name: string, value: string) => void;
  style?: StyleProp<ViewStyle>;
  outlineStyle?: StyleProp<ViewStyle>;
  preValidate?: 'required';
  validate?: ((value: string) => boolean)[];
  validationMessage?: string[];
};

export default function MukTextInput({
  name,
  label,
  value,
  hideText,
  autoCapitalize,
  onChange,
  style,
  outlineStyle,
  preValidate,
  validate,
  validationMessage,
}: Props) {
  const {colors} = useTheme();
  const {t} = useServices();
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (text: string) => {
    if (onChange) {
      onChange(name, text);
    }
    validateInput(text);
  };

  const validateInput = (text: string) => {
    if (validate && validationMessage && validate.length === validationMessage.length) {
      setError(null);
      if (preValidate === 'required' && text.length === 0) {
        setError(t.do('error.notEmpty'));
        return;
      }
      for (let i = 0; i < validate.length; i++) {
        const validationFunction = validate[i];
        if (!validationFunction(text)) {
          setError(validationMessage[i]);
          return;
        }
      }
    }
  };

  return (
    <View>
      <TextInput
        label={label}
        mode={'outlined'}
        secureTextEntry={hideText ?? false}
        value={value}
        autoCapitalize={autoCapitalize ?? 'none'}
        onChangeText={handleInputChange}
        outlineStyle={[{borderRadius: 16}, outlineStyle]}
        style={[{width: '100%', color: colors.secondary, backgroundColor: 'transparent'}, style]}
      />
      {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
    </View>
  );
}
