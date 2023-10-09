import {Dialog, MD3Theme, Text, useTheme} from 'react-native-paper';
import {ReactNode, useState} from 'react';
import MukButton from './MukButton';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {StyleSheet} from 'react-native';

type Props = {
  title?: string;
  content?: string;
  children?: ReactNode;
  visible: boolean;
  onReject?: () => void;
  onAccept: () => PVoid;
  labelReject?: string;
  labelAccept?: string;
};

export default function MukDialog({
  title,
  content,
  children,
  visible,
  onReject,
  onAccept,
  labelReject,
  labelAccept,
}: Props) {
  const theme = useTheme();
  const styles = makeStyles({theme});
  const [loading, setLoading] = useState(false);
  const onDismiss = loading ? () => {} : onReject;

  return (
    <Dialog visible={visible} onDismiss={onDismiss} style={[{backgroundColor: theme.colors.background}, styles.shadow]}>
      <Dialog.Title style={{color: theme.colors.secondary, fontSize: responsiveSize(20), fontWeight: 'bold'}}>
        {title}
      </Dialog.Title>
      <Dialog.Content style={{paddingBottom: responsiveWidth(24)}}>
        <Text style={{color: theme.colors.secondary, fontSize: responsiveSize(14)}}>{content}</Text>
        {children}
      </Dialog.Content>
      <Dialog.Actions style={{gap: responsiveWidth(16)}}>
        <MukButton
          onPress={onDismiss}
          label={labelReject ?? 'Geri Dön'}
          buttonStyle={{backgroundColor: theme.colors.error}}
          scale={0.8}
          textStyle={{color: theme.colors.secondary, fontSize: responsiveSize(14), fontWeight: '600'}}
        />
        <MukButton
          loading={loading}
          onPress={() => {
            setLoading(true);
            onAccept().then(() => setLoading(false));
          }}
          label={labelAccept ?? 'Onayla'}
          buttonStyle={{backgroundColor: theme.colors.primary}}
          scale={0.8}
          textStyle={{color: theme.colors.secondary, fontSize: responsiveSize(14), fontWeight: '600'}}
        />
      </Dialog.Actions>
    </Dialog>
  );
}

type SProps = {
  theme: MD3Theme;
};

const makeStyles = ({theme}: SProps) =>
  StyleSheet.create({
    shadow: {
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 0,
    },
  });
