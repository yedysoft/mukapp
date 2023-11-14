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

const generateChildsWithRefs = (children: ReactNode) => {
  return Children.map(children, (child: any) => {
    const childRef = useRef<MukTextInputRef>(null);
    return cloneElement(child, {...child.props, ref: childRef});
  });
};

const MukForm = forwardRef<MukFormRef, Props>(({children, style}: Props, ref) => {
  const {t} = useServices();

  const validateInput = (child: any): boolean => {
    let text: string | undefined = child.value;
    if (!text) {
      text = '';
    }
    if (child.preValidate) {
      if (child.preValidate === 'required' && text.length === 0) {
        return false;
      }
    }
    if (child.validate && child.validationMessage && child.validate.length === child.validationMessage.length) {
      for (let i = 0; i < child.validate.length; i++) {
        const validationFunction = child.validate[i];
        if (!validationFunction(text)) {
          return false;
        }
      }
    }
    return true;
  };

  const validateInputs = () => {
    let isValid = true;
    Children.forEach(children, (child: any) => {
      const error = validateInput(child.props);
      if (!error) {
        isValid = false;
      }
    });
    console.log('isValid', isValid);
    return isValid;
  };

  useImperativeHandle(ref, () => ({
    validateInputs,
  }));

  return <View style={style}>{generateChildsWithRefs(children)}</View>;
});

export default MukForm;
