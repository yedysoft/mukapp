import {Dialog, Text, useTheme} from 'react-native-paper';
import {ReactNode, useState} from 'react';
import MukButton from './MukButton';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {StyleSheet} from 'react-native';
import {MukColors, MukTheme, PVoid} from '../../types';

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
  const {colors} = useTheme<MukTheme>();
  const styles = makeStyles(colors);
  const [loading, setLoading] = useState(false);
  const onDismiss = loading ? () => {} : onReject;

  return (
    <Dialog visible={visible} onDismiss={onDismiss} style={[{backgroundColor: colors.background}, styles.shadow]}>
      <Dialog.Title style={{color: colors.secondary, fontSize: responsiveSize(20), fontWeight: 'bold'}}>
        {title}
      </Dialog.Title>
      <Dialog.Content style={{paddingBottom: responsiveWidth(24)}}>
        <Text style={{color: colors.secondary, fontSize: responsiveSize(14)}}>{content}</Text>
        {children}
      </Dialog.Content>
      <Dialog.Actions style={{gap: responsiveWidth(16)}}>
        <MukButton
          onPress={onDismiss}
          label={labelReject ?? 'Geri Dön'}
          buttonStyle={{backgroundColor: colors.error}}
          scale={0.8}
          textStyle={{color: colors.secondary, fontSize: responsiveSize(14), fontWeight: '600'}}
        />
        <MukButton
          loading={loading}
          onPress={() => {
            setLoading(true);
            onAccept().then(() => setLoading(false));
          }}
          label={labelAccept ?? 'Onayla'}
          buttonStyle={{backgroundColor: colors.primary}}
          scale={0.8}
          textStyle={{color: colors.secondary, fontSize: responsiveSize(14), fontWeight: '600'}}
        />
      </Dialog.Actions>
    </Dialog>
  );
}

const makeStyles = (colors: MukColors) =>
  StyleSheet.create({
    shadow: {
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 0,
    },
  });
