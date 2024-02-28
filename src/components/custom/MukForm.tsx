import React, {cloneElement, ForwardedRef, forwardRef, ReactNode, useImperativeHandle, useRef} from 'react';
import {ScrollView, StyleProp, ViewStyle} from 'react-native';
import {stores} from '../../stores';
import {services, useServices} from '../../services';
import {MukTextInputRef} from './MukTextInput';
import {genericMemo} from '../../utils/util';

type Props<T> = {
  children: ReactNode;
  onSubmit: () => void;
  data: T;
  style?: StyleProp<ViewStyle>;
};

export type MukFormRef<T> = {
  validateInputs: () => boolean;
  formData: (key?: keyof T) => T | T[keyof T];
};

const MukFormComp = forwardRef<MukFormRef<any>, Props<any>>(
  <T,>({children, onSubmit, data, style}: Props<T>, ref: ForwardedRef<MukFormRef<T>>) => {
    console.log('MukFormCompRender', data);
    const {api, t} = useServices();
    const refChildrens = api.helper.generateChildsWithRefs<MukTextInputRef>(children);
    const form = useRef<T>(data);

    const handleOnChange = (name: string, value: string) => {
      form.current = {...form.current, [name]: value};
    };

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

    return (
      <ScrollView contentContainerStyle={style}>
        {refChildrens.map((child, index) => {
          const last = index + 1 === refChildrens.length;
          const props = {
            key: index,
            returnKeyType: last ? 'done' : 'next',
            returnKeyLabel: last ? 'Accept' : 'Next',
            onSubmitEditing: last ? onSubmit : () => refChildrens[index + 1].ref.current?.focus(),
            blurOnSubmit: last,
            defaultValue: data && data[child.props.name as keyof T],
            onCustomChange: handleOnChange,
          };
          return cloneElement(child, {...child.props, ...props});
        })}
      </ScrollView>
    );
  },
);

const MukForm = genericMemo(MukFormComp, (prevProps, nextProps) => services.api.helper.isEqual(prevProps, nextProps));
export default MukForm;
