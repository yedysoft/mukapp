import {TextInput, useTheme} from 'react-native-paper';
import {InputModeOptions, StyleProp, Text, TextStyle, View, ViewStyle} from 'react-native';
import {forwardRef, useImperativeHandle, useState} from 'react';
import {services, useServices} from '../../services';
import {genericMemo, responsiveWidth} from '../../utils/util';
import {MukTheme} from '../../types';
import {useStores} from '../../stores';

type Props = {
  name: string;
  label?: string;
  mode?: 'flat' | 'outlined';
  value?: string;
  hideText?: boolean;
  multiline?: boolean;
  inputMode?: InputModeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onChange?: (name: string, value: string) => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
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
  disabled?: boolean;
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
      multiline,
      inputMode,
      autoCapitalize,
      onChange,
      style,
      contentStyle,
      inputStyle,
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
      disabled,
    }: Props,
    ref,
  ) => {
    console.log('MukTextInputCompRender', name);
    const {colors} = useTheme<MukTheme>();
    const {ui} = useStores();
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
          dense
          label={label}
          disabled={disabled}
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
          multiline={multiline}
          onFocus={() => {
            validateInput(value);
            if (onFocus) {
              onFocus();
            }
          }}
          underlineStyle={underlineStyle}
          outlineStyle={[{borderRadius: 16, borderColor: 'transparent'}, outlineStyle]}
          showSoftInputOnFocus={showKeyboard}
          contentStyle={{maxHeight: responsiveWidth(100)}}
          style={[
            {
              width: '100%',
              color: colors.secondary,
              backgroundColor: 'transparent',
              paddingVertical: responsiveWidth(4),
              textAlign: ui.getLanguage === 'ar' ? 'right' : 'left',
            },
            inputStyle,
          ]}
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
