import React, {cloneElement, ForwardedRef, forwardRef, ReactNode, useEffect, useImperativeHandle, useRef} from 'react';
import {ScrollView, StyleProp, ViewStyle} from 'react-native';
import {stores} from '../../stores';
import {services, useServices} from '../../services';
import {YedyTextInputRef} from './YedyTextInput';
import {genericMemo, responsiveWidth} from '../../utils/util';

type Props<T> = {
  children: ReactNode;
  onSubmit: () => void;
  data: T;
  style?: StyleProp<ViewStyle>;
};

export type YedyFormRef<T> = {
  validateInputs: () => boolean;
  formData: (key?: keyof T) => T | T[keyof T];
};

const FormComp = forwardRef<YedyFormRef<any>, Props<any>>(
  <T,>({children, onSubmit, data, style}: Props<T>, ref: ForwardedRef<YedyFormRef<T>>) => {
    console.log('CustomFormCompRender', data);
    const {api, t} = useServices();
    const form = useRef<T>(data);

    useEffect(() => {
      form.current = data;
    }, [data]);

    const handleOnChange = (name: string, value: string | number) => {
      form.current = {...form.current, [name]: value};
    };

    const refChildrens = api.helper.generateChildsWithRefs<YedyTextInputRef>(children).map((child, index, array) => {
      const last = index + 1 === array.length;
      const props = {
        key: index,
        returnKeyType: child.props.multiline ? undefined : last ? 'done' : 'next',
        returnKeyLabel: child.props.multiline ? undefined : last ? 'Accept' : 'Next',
        onSubmitEditing: child.props.multiline
          ? undefined
          : last
          ? onSubmit
          : () => {
              array[index + 1].ref.current?.focus();
              child.props.nextPage && child.props.nextPage();
            },
        blurOnSubmit: child.props.multiline ? false : last,
        defaultValue: data && data[child.props.name as keyof T] && String(data[child.props.name as keyof T]),
        onCustomChange: handleOnChange,
      };
      return cloneElement(child, {...child.props, ...props}) as any;
    });

    const validateInputs = () => {
      let isValid = true;
      for (const child of refChildrens) {
        const ref = child.ref.current;
        const error = ref.validateInput(ref.inputValue());
        if (!error) {
          isValid = false;
        }
      }
      if (!isValid) {
        stores.ui.addWarning(t.do('error.notValidInputs'));
      }
      return isValid;
    };

    const getFormData = (key?: keyof T) => (key ? form.current[key as keyof T] : form.current);

    useImperativeHandle(ref, () => ({
      validateInputs,
      formData: getFormData,
    }));

    return <ScrollView contentContainerStyle={[{gap: responsiveWidth(10)}, style]}>{refChildrens}</ScrollView>;
  },
);

const YedyForm = genericMemo(FormComp, (prevProps, nextProps) => services.api.helper.isEqual(prevProps, nextProps));
export default YedyForm;
