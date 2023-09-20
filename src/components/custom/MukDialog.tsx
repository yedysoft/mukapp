import {Text, Dialog} from "react-native-paper";
import {ReactNode} from "react";
import MukButton from "./MukButton";
import {responsiveSize, responsiveWidth} from "../../utils/Responsive";

type Props = {
  title?: string,
  content?: string,
  children?: ReactNode,
  visible: boolean,
  onReject?: () => void,
  onAccept?: () => void,
}

export default function MukDialog({title, content, children, visible, onReject, onAccept}: Props) {
  return (
    <Dialog visible={visible} onDismiss={onReject}>
      <Dialog.Title style={{color: 'white', fontSize: responsiveSize(24), fontWeight: 'bold'}}>{title}</Dialog.Title>
      <Dialog.Content>
        <Text style={{color: 'white', fontSize: responsiveSize(16)}}>{content}</Text>
        {children}
      </Dialog.Content>
      <Dialog.Actions style={{gap: responsiveWidth(16)}}>
        <MukButton onPress={onReject} label={'Geri Dön'} buttonStyle={{backgroundColor: 'red'}}/>
        <MukButton onPress={onAccept} label={'Onayla'} buttonStyle={{backgroundColor: 'green'}}/>
      </Dialog.Actions>
    </Dialog>
  );
}
