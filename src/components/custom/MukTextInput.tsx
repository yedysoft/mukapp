import {TextInput, TextInputProps, useTheme} from 'react-native-paper';
import {StyleProp, Text, TextInput as TextInputRN, TextStyle, View, ViewStyle} from 'react-native';
import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {services, useServices} from '../../services';
import {genericMemo, responsiveWidth} from '../../utils/util';
import {MukTheme} from '../../types';
import {useStores} from '../../stores';

type Props = {
  name: string;
  visible?: boolean;
  onCustomChange?: (name: string, value: string) => void;
  viewStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  preValidate?: 'required';
  validate?: ((value: string) => boolean)[];
  validationMessage?: string[];
  showKeyboard?: boolean;
} & TextInputProps;

export type MukTextInputRef = {
  validateInput: (text: string) => void;
  inputValue: string;
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
    const [error, setError] = useState<string | null>(null);

    const handleChangeText = (text: string) => {
      rest.value = text;
      onCustomChange && onCustomChange(name, text);
      validateInput(text);
    };

    const handleFocus = (e: any) => {
      validateInput(rest.value);
      rest.onFocus && rest.onFocus(e);
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
      inputValue: rest.value ?? '',
      focus: inputRef.current?.focus,
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
          selectionColor={rest.selectionColor ?? colors.primary}
          placeholderTextColor={colors.outlineVariant}
          error={error !== null}
          dense
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
        <Text style={{display: error ? undefined : 'none', color: colors.error}}>* {error}</Text>
      </View>
    );
  },
);

const MukTextInput = genericMemo(MukTextInputComp, (prevProps, nextProps) =>
  services.api.helper.isEqual(prevProps, nextProps),
);
export default MukTextInput;
