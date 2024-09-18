import {Dialog, Text, useTheme} from 'react-native-paper';
import {ReactNode, useState} from 'react';
import MukButton from './MukButton';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {StyleSheet, View} from 'react-native';
import {MukColors, MukTheme, PVoid} from '../../types';
import {useServices} from '../../services';

type Props = {
  children?: ReactNode;
  visible: boolean;
  onReject?: () => void;
  onAccept: () => PVoid;
  name?: 'default' | 'spotify' | 'premium';
};

export default function MukDialog({children, visible, onReject, onAccept, name}: Props) {
  const {colors} = useTheme<MukTheme>();
  const styles = makeStyles(colors);
  const [loading, setLoading] = useState(false);
  const onDismiss = loading ? () => {} : onReject;
  const {t, api} = useServices();

  return (
    <View
      style={{
        display: visible ? undefined : 'none',
        flex: 1,
        backgroundColor: api.helper.hexToRgba(colors.background, 0.5),
      }}
    >
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={[{backgroundColor: colors.background, borderRadius: 24}, styles.shadow]}
      >
        <Dialog.Title style={{color: colors.secondary, fontSize: responsiveSize(20), fontWeight: 'bold'}}>
          {t.do(`dialog.${name ?? 'default'}.title`)}
        </Dialog.Title>
        <Dialog.Content style={{paddingBottom: responsiveWidth(24)}}>
          <Text style={{color: colors.secondary, fontSize: responsiveSize(14)}}>
            {t.do(`dialog.${name ?? 'default'}.content`)}
          </Text>
          {children}
        </Dialog.Content>
        <Dialog.Actions
          style={{gap: responsiveWidth(16), paddingBottom: responsiveWidth(20), paddingRight: responsiveWidth(24)}}
        >
          <MukButton
            onPress={onDismiss}
            label={t.do(`dialog.${name ?? 'default'}.reject`)}
            buttonStyle={{backgroundColor: colors.shadow}}
            scale={0.8}
            textStyle={{color: colors.secondary, fontSize: responsiveSize(14), fontWeight: '600'}}
          />
          <MukButton
            loading={loading}
            onPress={() => {
              setLoading(true);
              onAccept().then(() => setLoading(false));
            }}
            label={t.do(`dialog.${name ?? 'default'}.accept`)}
            buttonStyle={{backgroundColor: colors.primary}}
            scale={0.8}
            textStyle={{color: colors.background, fontSize: responsiveSize(14), fontWeight: '600'}}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
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
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 0,
    },
  });
