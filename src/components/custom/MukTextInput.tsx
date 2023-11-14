import {TextInput, useTheme} from 'react-native-paper';
import {InputModeOptions, StyleProp, Text, View, ViewStyle} from 'react-native';
import {forwardRef, useImperativeHandle, useState} from 'react';
import {useServices} from '../../services';
import {responsiveWidth} from '../../utils/Responsive';

type Props = {
  name: string;
  label?: string;
  mode?: 'flat' | 'outlined';
  value?: string;
  hideText?: boolean;
  inputMode?: InputModeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onChange?: (name: string, value: string) => void;
  style?: StyleProp<ViewStyle>;
  outlineStyle?: StyleProp<ViewStyle>;
  preValidate?: 'required';
  validate?: ((value: string) => boolean)[];
  validationMessage?: string[];
  placeholder?: string;
};

export type MukTextInputRef = {
  validateInput: (text: string) => void;
  test: () => void;
};

const MukTextInput = forwardRef<MukTextInputRef, Props>(
  (
    {
      name,
      mode,
      label,
      value,
      hideText,
      inputMode,
      autoCapitalize,
      onChange,
      style,
      outlineStyle,
      preValidate,
      validate,
      validationMessage,
      placeholder,
    }: Props,
    ref,
  ) => {
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
      setError(null);
      if (preValidate) {
        if (preValidate === 'required' && text.length === 0) {
          setError(t.do('error.notEmpty'));
          return;
        }
      }
      if (validate && validationMessage && validate.length === validationMessage.length) {
        for (let i = 0; i < validate.length; i++) {
          const validationFunction = validate[i];
          if (!validationFunction(text)) {
            setError(validationMessage[i]);
            return;
          }
        }
      }
    };

    const test = () => console.log('test');

    useImperativeHandle(ref, () => ({
      validateInput,
      test,
    }));

    return (
      <View style={{flexDirection: 'column', gap: responsiveWidth(8)}}>
        <TextInput
          label={label}
          inputMode={inputMode}
          mode={mode ?? 'flat'}
          secureTextEntry={hideText}
          value={value}
          error={error !== null}
          placeholder={placeholder}
          placeholderTextColor={colors.outlineVariant}
          autoCapitalize={autoCapitalize ?? 'none'}
          onChangeText={handleInputChange}
          outlineStyle={[{borderRadius: 16}, outlineStyle]}
          style={[
            {width: '100%', color: colors.secondary, backgroundColor: 'transparent', marginBottom: responsiveWidth(24)},
            style,
          ]}
        />
        {error ? <Text style={{color: colors.error}}>* {error}</Text> : null}
      </View>
    );
  },
);

export default MukTextInput;
