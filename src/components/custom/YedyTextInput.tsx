import {
  Keyboard,
  KeyboardType,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  TextInputSubmitEditingEventData,
  View,
  ViewStyle,
} from 'react-native';
import {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {services, useServices} from '../../services';
import {genericMemo, responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import YedyText from './YedyText';
import YedyDatePicker from './picker/YedyDatePicker';
import YedyPicker from './picker/YedyPicker';
import YedyPickerView from './picker/YedyPickerView';
import {useTheme} from '../../hooks';

type Validates = 'required';

type ValidateFunction = (value: string | number) => boolean;

type Props = TextInputProps & {
  name: string;
  visible?: boolean;
  showError?: boolean;
  label?: string;
  onCustomChange?: (name: string, value: string | number | undefined) => void;
  viewStyle?: StyleProp<ViewStyle>;
  preValidate?: Validates | Validates[];
  validate?: ValidateFunction[];
  validationMessage?: string[];
  showKeyboard?: boolean;
  quotedMessage?: ReactNode;
  nextPage?: () => void;
  isFormElement?: boolean;
  isPicker?: boolean;
  pickerType?: 'normal' | 'date';
  pickerItems?: Record<string | number, string> | (string | number)[];
  datePickerMinMax?: {min?: number; max?: number};
};

export type YedyTextInputRef = {
  validateInput: (text: string | number) => boolean;
  inputValue: () => string | number | undefined;
  focus: () => void;
  clear: () => void;
};

const TextInputComp = observer(
  forwardRef<YedyTextInputRef, Props>(
    (
      {
        name,
        visible = true,
        showError = true,
        label,
        onCustomChange,
        viewStyle,
        preValidate,
        validate,
        validationMessage,
        showKeyboard,
        quotedMessage,
        isFormElement = true,
        isPicker,
        pickerType = 'normal',
        pickerItems,
        datePickerMinMax,
        ...rest
      }: Props,
      ref,
    ) => {
      const inputRef = useRef<TextInput>(null);
      const {colors} = useTheme();
      const {ui} = useStores();
      const {t} = useServices();
      const validInputValue = rest.value ?? rest.defaultValue;
      const [error, setError] = useState<string | null>(null);
      const [isEmpty, setIsEmpty] = useState<boolean>(!validInputValue);
      const value = useRef<string | undefined>(validInputValue);

      useEffect(() => {
        isEmpty !== !validInputValue && setIsEmpty(!validInputValue);
        value.current !== validInputValue && (value.current = validInputValue);
        pickerValue.current !== validInputValue && (pickerValue.current = validInputValue);
      }, [validInputValue]);

      ///Picker
      const [pickerVisible, setPickerVisible] = useState(false);
      const [pickerPretty, setPickerPretty] = useState<string | undefined>();
      const pickerValue = useRef<string | number | undefined>(validInputValue);
      const pickerChangeVisible = (open: boolean, isNextButton = false) => {
        !isNextButton && ui.set('pickerViewVisible', open);
        setPickerVisible(open);
      };

      const handleValueChange = (_name: string, value: string | number | undefined, prettyValue?: string) => {
        pickerValue.current = value;
        handleChangeText(String(value));
        setPickerPretty(prettyValue);
      };
      ///Picker

      const handleChangeText = (text: string) => {
        value.current = text;
        const v = getValue();
        showError && validateInput(v);
        if (v && isEmpty) {
          setIsEmpty(false);
        } else if (!v) {
          setIsEmpty(true);
        }
        onCustomChange && isFormElement && onCustomChange(name, v);
        rest.onChangeText && rest.onChangeText(text);
      };

      const handleFocus = (e: any) => {
        showError && validateInput(getValue());
        if (isPicker) {
          Keyboard.dismiss();
          pickerChangeVisible(true);
        }
        rest.onFocus && rest.onFocus(e);
      };

      const changeError = (text: string | null) => showError && error !== text && setError(text);

      const validateInput = (text: string | number | undefined): boolean => {
        if (!text) {
          text = '';
        }
        if (preValidate) {
          if (preValidate === 'required' && (String(text).length === 0 || String(text).trim().length === 0)) {
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

      const getValue = () => {
        if (isPicker) {
          return pickerValue.current;
        }
        if (value.current) {
          const numberTypes: KeyboardType[] = ['number-pad', 'numeric', 'decimal-pad'];
          if (rest.keyboardType && numberTypes.some(t => t === rest.keyboardType)) {
            return Number(value.current);
          }
        }
        return value.current;
      };

      const focusInput = () => {
        if (isPicker) {
          Keyboard.dismiss();
          pickerChangeVisible(true);
        } else {
          inputRef.current?.focus();
        }
      };

      const clearInput = () => {
        inputRef.current?.clear();
        value.current = '';
      };

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
              display: visible ? undefined : 'none',
              width: '100%',
            },
            viewStyle,
          ]}
        >
          <Pressable
            style={{
              flexDirection: 'column',
              gap: responsiveWidth(quotedMessage ? 0 : 4),
            }}
            onPress={focusInput}
          >
            <YedyText
              visible={!isEmpty && !!label}
              size={10}
              color={colors.outlineVariant}
              style={{
                position: 'absolute',
                left: responsiveWidth(10),
                top: responsiveHeight(3),
                zIndex: 1400,
              }}
            >
              {label}
            </YedyText>
            <View
              style={{
                padding: responsiveWidth(8),
                paddingBottom: 0,
                backgroundColor: colors.shadow,
                display: quotedMessage ? undefined : 'none',
                borderTopRightRadius: 16,
                borderTopLeftRadius: 16,
              }}
            >
              {quotedMessage}
            </View>
            <TextInput
              ref={inputRef}
              {...rest}
              defaultValue={isPicker ? undefined : rest.defaultValue}
              editable={isPicker ? false : rest.editable}
              placeholder={label ?? rest.placeholder}
              autoCapitalize={rest.autoCapitalize ?? 'none'}
              value={pickerPretty}
              selectionColor={rest.selectionColor ?? colors.primary}
              placeholderTextColor={colors.outlineVariant}
              showSoftInputOnFocus={!isPicker && showKeyboard}
              onChangeText={handleChangeText}
              onFocus={handleFocus}
              onPressOut={isPicker ? focusInput : rest.onPressOut}
              style={[
                {
                  fontFamily: 'ProductSans-Regular',
                  fontSize: responsiveSize(13),
                  color: colors.secondary,
                  backgroundColor: colors.shadow,
                  textAlign: ui.getLanguage === 'ar' ? 'right' : 'left',
                  paddingHorizontal: responsiveWidth(16),
                  paddingVertical: responsiveHeight(Platform.OS === 'ios' ? 16 : 10),
                  borderRadius: 16,
                  borderTopLeftRadius: quotedMessage ? 0 : 16,
                  borderTopRightRadius: quotedMessage ? 0 : 16,
                },
                rest.style,
              ]}
            />
          </Pressable>
          <YedyText size={13} visible={!!error} color={colors.error} style={{paddingLeft: responsiveWidth(8)}}>
            * {error}
          </YedyText>
          {isPicker && pickerType ? (
            <YedyPickerView
              visible={pickerVisible}
              changeVisible={pickerChangeVisible}
              buttonIcon={rest.returnKeyType === 'done' ? 'check-bold' : 'arrow-right-thick'}
              buttonOnPress={() => {
                if (rest.onSubmitEditing) {
                  pickerChangeVisible(false, rest.returnKeyType === 'next');
                  rest.onSubmitEditing({} as NativeSyntheticEvent<TextInputSubmitEditingEventData>);
                }
              }}
              onClear={() => handleValueChange('', undefined, undefined)}
            >
              {pickerType === 'normal' && pickerItems ? (
                <YedyPicker name={name} items={pickerItems} value={getValue()} onValueChange={handleValueChange} />
              ) : (
                <YedyDatePicker
                  name={name}
                  minYear={datePickerMinMax?.min}
                  maxYear={datePickerMinMax?.max}
                  value={getValue() as string}
                  onValueChange={handleValueChange}
                />
              )}
            </YedyPickerView>
          ) : undefined}
        </View>
      );
    },
  ),
);

const YedyTextInput = genericMemo(TextInputComp, (prevProps, nextProps) =>
  services.api.helper.isEqual(prevProps, nextProps),
);
export default YedyTextInput;
