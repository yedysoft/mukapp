import {HelperText, TextInput, TextInputProps, useTheme} from 'react-native-paper';
import {StyleProp, TextInput as TextInputRN, TextStyle, View, ViewStyle} from 'react-native';
import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {services, useServices} from '../../services';
import {genericMemo, responsiveWidth} from '../../utils/util';
import {MukTheme} from '../../types';
import {useStores} from '../../stores';

type Validates = 'required';

type ValidateFunction = (value: string) => boolean;

type Props = TextInputProps & {
  name: string;
  visible?: boolean;
  showError?: boolean;
  onCustomChange?: (name: string, value: string) => void;
  viewStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  preValidate?: Validates | Validates[];
  validate?: ValidateFunction[];
  validationMessage?: string[];
  showKeyboard?: boolean;
};

export type MukTextInputRef = {
  validateInput: (text: string) => boolean;
  inputValue: () => string;
  focus: () => void;
  clear: () => void;
};

const MukTextInputComp = forwardRef<MukTextInputRef, Props>(
  (
    {
      name,
      visible = true,
      showError = true,
      onCustomChange,
      viewStyle,
      inputStyle,
      preValidate,
      validate,
      validationMessage,
      showKeyboard,
      ...rest
    }: Props,
    ref,
  ) => {
    console.log('MukTextInputCompRender', name);
    const inputRef = useRef<TextInputRN>(null);
    const {colors} = useTheme<MukTheme>();
    const {ui} = useStores();
    const {t} = useServices();
    const validInputValue = rest.value ?? rest.defaultValue;
    const [error, setError] = useState<string | null>(null);
    const value = useRef<string | undefined>(validInputValue);

    const handleChangeText = (text: string) => {
      showError && validateInput(text);
      value.current = text;
      onCustomChange && onCustomChange(name, text);
      rest.onChangeText && rest.onChangeText(text);
    };

    const handleFocus = (e: any) => {
      showError && validateInput(value.current);
      rest.onFocus && rest.onFocus(e);
    };

    const changeError = (text: string | null) => error !== text && setError(text);

    const validateInput = (text: string | undefined): boolean => {
      if (!text) {
        text = '';
      }
      if (preValidate) {
        if (preValidate === 'required' && (text.length === 0 || text.trim().length === 0)) {
          changeError(t.do('error.required'));
          return false;
        }
      }
      if (validate && validationMessage && validate.length === validationMessage.length) {
        for (let i = 0; i < validate.length; i++) {
          const validationFunction = validate[i];
          if (!validationFunction(text)) {
            changeError(validationMessage[i]);
            return false;
          }
        }
      }
      changeError(null);
      return true;
    };

    const getValue = () => value.current ?? '';

    const focusInput = () => inputRef.current?.focus();

    const clearInput = () => inputRef.current?.clear();

    useImperativeHandle(ref, () => ({
      validateInput,
      inputValue: getValue,
      focus: focusInput,
      clear: clearInput,
    }));

    return (
      <View
        style={[
          {
            flexDirection: 'column',
            gap: showError ? responsiveWidth(8) : undefined,
            minHeight: showError ? responsiveWidth(60) : undefined,
            display: visible ? undefined : 'none',
          },
          viewStyle,
        ]}
      >
        <TextInput
          ref={inputRef}
          {...rest}
          dense
          autoCapitalize={rest.autoCapitalize ?? 'none'}
          value={undefined}
          selectionColor={rest.selectionColor ?? colors.primary}
          placeholderTextColor={colors.outlineVariant}
          error={error !== null}
          showSoftInputOnFocus={showKeyboard}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          style={[
            {
              width: '100%',
              color: colors.secondary,
              backgroundColor: 'transparent',
              textAlign: ui.getLanguage === 'ar' ? 'right' : 'left',
            },
            inputStyle,
          ]}
          outlineStyle={[{borderRadius: 16, borderColor: 'transparent'}, rest.outlineStyle]}
          contentStyle={[{maxHeight: responsiveWidth(100)}, rest.contentStyle]}
        />
        <HelperText type={'error'} visible={!!error} style={{color: colors.error, display: error ? undefined : 'none'}}>
          * {error}
        </HelperText>
      </View>
    );
  },
);

const MukTextInput = genericMemo(MukTextInputComp, (prevProps, nextProps) =>
  services.api.helper.isEqual(prevProps, nextProps),
);
export default MukTextInput;
