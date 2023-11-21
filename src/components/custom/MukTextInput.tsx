import {TextInput, useTheme} from 'react-native-paper';
import {InputModeOptions, StyleProp, Text, View, ViewStyle} from 'react-native';
import {forwardRef, useImperativeHandle, useState} from 'react';
import {useServices} from '../../services';
import {responsiveWidth} from '../../utils/Responsive';
import {MukTheme} from '../../types';

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
  onFocus?: () => void;
  onBlur?: () => void;
  selectionColor?: string;
};

export type MukTextInputRef = {
  validateInput: (text: string) => void;
  inputValue: string;
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
      onFocus,
      onBlur,
      selectionColor
    }: Props,
    ref,
  ) => {
    const {colors} = useTheme<MukTheme>();
    const {t} = useServices();
    const [error, setError] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (text: string) => {
      setInputValue(text);
      if (onChange) {
        onChange(name, text);
      }
      validateInput(text);
    };

    const validateInput = (text: string | undefined): boolean => {
      setError(null);
      if (!text) {
        text = '';
      }
      if (preValidate) {
        if (preValidate === 'required' && (text.length === 0 || text.trim().length === 0)) {
          setError(t.do('error.notEmpty'));
          return false;
        }
      }
      if (validate && validationMessage && validate.length === validationMessage.length) {
        for (let i = 0; i < validate.length; i++) {
          const validationFunction = validate[i];
          if (!validationFunction(text)) {
            setError(validationMessage[i]);
            return false;
          }
        }
      }
      return true;
    };

    useImperativeHandle(ref, () => ({
      validateInput,
      inputValue,
    }));

    return (
      <View style={[{flexDirection: 'column', gap: responsiveWidth(8), minHeight: responsiveWidth(80)}, style]}>
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
          onBlur={onBlur}
          selectionColor={selectionColor ?? colors.primary}
          onFocus={() => {
            validateInput(value ?? inputValue);
            if (onFocus) {
              onFocus();
            }
          }}
          outlineStyle={[{borderRadius: 16}, outlineStyle]}
          style={[{width: '100%', color: colors.secondary, backgroundColor: 'transparent'}]}
        />
        <Text style={{display: error ? undefined : 'none', color: colors.error}}>* {error}</Text>
      </View>
    );
  },
);

export default MukTextInput;
