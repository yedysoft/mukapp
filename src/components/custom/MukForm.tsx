import React, {cloneElement, forwardRef, ReactNode, useImperativeHandle, useRef} from 'react';
import {ScrollView, StyleProp, ViewStyle} from 'react-native';
import {stores} from '../../stores';
import {services, useServices} from '../../services';
import {MukTextInputRef} from './MukTextInput';
import {genericMemo} from '../../utils/util';

type Props = {
  children: ReactNode;
  onSubmit: () => void;
  data: any;
  style?: StyleProp<ViewStyle>;
};

export type MukFormRef = {
  validateInputs: () => boolean;
  formData: any;
};

const MukFormComp = forwardRef<MukFormRef, Props>(({children, onSubmit, data, style}: Props, ref) => {
  console.log('MukFormCompRender', data);
  const {api, t} = useServices();
  const refChildrens = api.helper.generateChildsWithRefs<MukTextInputRef>(children);
  const form = useRef<any>(data);

  const handleOnChange = (name: string, value: string) => {
    console.log('handleOnChange', form.current, name, value);
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

  const getFormData = () => form.current;

  useImperativeHandle(
    ref,
    () => ({
      validateInputs,
      formData: getFormData,
    }),
    [form, form.current],
  );

  return (
    <ScrollView style={style}>
      {refChildrens.map((child, index) => {
        const last = index + 1 === refChildrens.length;
        const nextRef = last ? null : refChildrens[index + 1].ref.current;

        const props = {
          key: index,
          returnKeyType: last ? 'done' : 'next',
          returnKeyLabel: last ? 'Onayla' : 'Sonraki',
          onSubmitEditing: last ? onSubmit : () => nextRef?.focus(),
          blurOnSubmit: last,
          defaultValue: data && data[child.props.name],
          onCustomChange: handleOnChange,
        };
        return cloneElement(child, {...child.props, ...props});
      })}
    </ScrollView>
  );
});

const MukForm = genericMemo(MukFormComp, (prevProps, nextProps) => services.api.helper.isEqual(prevProps, nextProps));
export default MukForm;
