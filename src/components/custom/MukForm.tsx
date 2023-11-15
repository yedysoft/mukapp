import {forwardRef, ReactNode, useImperativeHandle} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {stores} from '../../stores';
import {useServices} from '../../services';
import {MukTextInputRef} from './MukTextInput';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export type MukFormRef = {
  validateInputs: () => boolean;
};

const MukForm = forwardRef<MukFormRef, Props>(({children, style}: Props, ref) => {
  const {api, t} = useServices();
  const refChildrens = api.helper.generateChildsWithRefs<MukTextInputRef>(children);

  const validateInputs = () => {
    let isValid = true;
    refChildrens.forEach((child: any) => {
      const cur = child.ref.current;
      const error = cur.validateInput(child.props.value ?? cur.inputValue);
      if (!error) {
        isValid = false;
      }
    });
    if (!isValid) {
      stores.ui.addErrors({type: 'warning', code: 0, message: t.do('error.notValidInputs')});
    }
    return isValid;
  };

  useImperativeHandle(ref, () => ({
    validateInputs,
  }));

  return <View style={style}>{refChildrens}</View>;
});

export default MukForm;
