import {Children, cloneElement, forwardRef, ReactNode, useImperativeHandle, useRef} from 'react';
import {useServices} from '../../services';
import {StyleProp, View, ViewStyle} from 'react-native';
import {MukTextInputRef} from './MukTextInput';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export type MukFormRef = {
  validateInputs: () => boolean;
};

const MukForm = forwardRef<MukFormRef, Props>(({children, style}: Props, ref) => {
  const {t} = useServices();

  const validateInput = (child: any): string | null => {
    const text: string = child.value;
    if (child.preValidate) {
      if (child.preValidate === 'required' && text.length === 0) {
        return t.do('error.notEmpty');
      }
    }
    if (child.validate && child.validationMessage && child.validate.length === child.validationMessage.length) {
      for (let i = 0; i < child.validate.length; i++) {
        const validationFunction = child.validate[i];
        if (!validationFunction(text)) {
          return child.validationMessage[i];
        }
      }
    }
    return null;
  };

  const validateInputs = () => {
    const errors: string[] = [];
    Children.forEach(children, (child: any) => {
      child.ref?.current.test();
      const error = validateInput(child.props);
      if (error) {
        errors.push(error);
      }
    });
    console.log(errors);
    return errors.length === 0;
  };

  useImperativeHandle(ref, () => ({
    validateInputs,
  }));

  return (
    <View style={style}>
      {Children.map(children, (child: any) => {
        const childRef = useRef<MukTextInputRef>(null);
        return cloneElement(child, {ref: childRef});
      })}
    </View>
  );
});

export default MukForm;
