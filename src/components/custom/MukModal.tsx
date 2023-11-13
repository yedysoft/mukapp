import {ReactNode} from 'react';
import {Modal, Portal, useTheme} from 'react-native-paper';
import {responsiveWidth} from '../../utils/Responsive';

type Props = {
  children?: ReactNode;
  visible: boolean;
  onDismiss?: () => void;
  backgroundColor?: string;
};

export default function MukModal({children, visible, onDismiss, backgroundColor}: Props) {
  const {colors} = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          backgroundColor: backgroundColor ?? colors.background,
          borderWidth: 3,
          borderColor: colors.secondary,
          padding: responsiveWidth(16),
          borderRadius: 16,
          alignSelf: 'center',
        }}
      >
        {children}
      </Modal>
    </Portal>
  );
}
