import {cloneElement, forwardRef, ReactNode, useImperativeHandle} from 'react';
import {ScrollView, StyleProp, ViewStyle} from 'react-native';
import {stores} from '../../stores';
import {useServices} from '../../services';
import {MukTextInputRef} from './MukTextInput';

type Props = {
  children: ReactNode;
  onSubmit: () => void;
  style?: StyleProp<ViewStyle>;
};

export type MukFormRef = {
  validateInputs: () => boolean;
};

export default forwardRef<MukFormRef, Props>(({children, style, onSubmit}: Props, ref) => {
  const {api, t} = useServices();
  const refChildrens = api.helper.generateChildsWithRefs<MukTextInputRef>(children);

  const validateInputs = () => {
    let isValid = true;
    for (const child of refChildrens) {
      const ref = child.ref.current;

      const error = ref.validateInput(child.props.value ?? ref.inputValue);
      if (!error) {
        isValid = false;
      }
    }
    if (!isValid) {
      stores.ui.addWarning(t.do('error.notValidInputs'));
    }
    return isValid;
  };

  useImperativeHandle(ref, () => ({
    validateInputs,
  }));

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
        };
        return cloneElement(child, {...child.props, ...props});
      })}
    </ScrollView>
  );
});
