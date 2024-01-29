import {HelperText, TextInput, TextInputProps, useTheme} from 'react-native-paper';
import {StyleProp, TextInput as TextInputRN, TextStyle, View, ViewStyle} from 'react-native';
import {forwardRef, memo, useImperativeHandle, useRef, useState} from 'react';
import {services, useServices} from '../../services';
import {responsiveWidth} from '../../utils/util';
import {MukTheme} from '../../types';
import {useStores} from '../../stores';

type Validates = 'required';

type ValidateFunction = (value: string) => boolean;

type Props = {
  name: string;
  visible?: boolean;
  onCustomChange?: (name: string, value: string) => void;
  viewStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  preValidate?: Validates | Validates[];
  validate?: ValidateFunction[];
  validationMessage?: string[];
  showKeyboard?: boolean;
} & TextInputProps;

export type MukTextInputRef = {
  validateInput: (text: string) => void;
  inputValue: () => string;
  focus?: () => void;
};

const MukTextInputComp = forwardRef<MukTextInputRef, Props>(
  (
    {
      name,
      visible = true,
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
      validateInput(text);
      value.current = text;
      onCustomChange && onCustomChange(name, text);
      rest.onChangeText && rest.onChangeText(text);
    };

    const handleFocus = (e: any) => {
      validateInput(value.current);
      rest.onFocus && rest.onFocus(e);
    };

    const validateInput = (text: string | undefined): boolean => {
      error != null && setError(null);
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

    const getValue = () => value.current ?? '';

    const getInputFocusFunc = () => {
      console.log(inputRef.current);
      return inputRef.current?.focus;
    };

    useImperativeHandle(ref, () => ({
      validateInput,
      inputValue: getValue,
      focus: getInputFocusFunc,
    }));

    return (
      <View
        style={[
          {
            flexDirection: 'column',
            gap: responsiveWidth(8),
            minHeight: responsiveWidth(60),
            display: visible ? undefined : 'none',
          },
          viewStyle,
        ]}
      >
        <TextInput
          ref={inputRef}
          {...rest}
          dense
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
              paddingVertical: responsiveWidth(4),
              textAlign: ui.getLanguage === 'ar' ? 'right' : 'left',
            },
            inputStyle,
          ]}
          outlineStyle={[{borderRadius: 16, borderColor: 'transparent'}, rest.outlineStyle]}
          contentStyle={[{maxHeight: responsiveWidth(100)}, rest.contentStyle]}
        />
        <HelperText type={'error'} visible={!!error} style={{color: colors.error}}>
          * {error}
        </HelperText>
      </View>
    );
  },
);

const MukTextInput = memo(MukTextInputComp, (prevProps, nextProps) =>
  services.api.helper.isEqual(prevProps, nextProps),
);
export default MukTextInput;
