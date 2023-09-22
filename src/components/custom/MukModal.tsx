import {ReactNode} from 'react';
import {Modal} from 'react-native-paper';
import {responsiveWidth} from '../../utils/Responsive';

type Props = {
  children?: ReactNode;
  visible: boolean;
  onDismiss?: () => void;
};

export default function MukModal({children, visible, onDismiss}: Props) {
  return (
    <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{backgroundColor: 'white', padding: responsiveWidth(16), borderRadius: 16, alignSelf: 'center'}}>
      {children}
    </Modal>
  );
}
