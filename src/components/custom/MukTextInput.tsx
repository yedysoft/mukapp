import {TextInput, useTheme} from 'react-native-paper';
import {InputModeOptions, StyleProp, Text, View, ViewStyle} from 'react-native';
import {forwardRef, useImperativeHandle, useState} from 'react';
import {services, useServices} from '../../services';
import {genericMemo, responsiveWidth} from '../../utils/util';
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
  underlineStyle?: StyleProp<ViewStyle>;
  preValidate?: 'required';
  validate?: ((value: string) => boolean)[];
  validationMessage?: string[];
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  selectionColor?: string;
  showKeyboard?: boolean;
};

export type MukTextInputRef = {
  validateInput: (text: string) => void;
  inputValue: string;
};

const MukTextInputComp = forwardRef<MukTextInputRef, Props>(
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
      selectionColor,
      underlineStyle,
      showKeyboard,
    }: Props,
    ref,
  ) => {
    console.log('MukTextInputCompRender', name);
    const {colors} = useTheme<MukTheme>();
    const {t} = useServices();
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (text: string) => {
      value = text;
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
          setError(t.do('error.required'));
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
      inputValue: value ?? '',
    }));

    return (
      <View style={[{flexDirection: 'column', gap: responsiveWidth(8), minHeight: responsiveWidth(60)}, style]}>
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
          selectionColor={selectionColor ?? colors.primary}
          onChangeText={handleInputChange}
          onBlur={onBlur}
          onFocus={() => {
            validateInput(value);
            if (onFocus) {
              onFocus();
            }
          }}
          underlineStyle={underlineStyle}
          outlineStyle={[{borderRadius: 16}, outlineStyle]}
          showSoftInputOnFocus={showKeyboard}
          style={[{width: '100%', color: colors.secondary, backgroundColor: 'transparent'}, style]}
        />
        <Text style={{display: error ? undefined : 'none', color: colors.error}}>* {error}</Text>
      </View>
    );
  },
);

const MukTextInput = genericMemo(MukTextInputComp, (prevProps, nextProps) =>
  services.api.helper.isEqual(prevProps, nextProps),
);
export default MukTextInput;
