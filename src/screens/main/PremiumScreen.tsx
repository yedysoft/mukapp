import {Text, useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveWidth} from '../../utils/util';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {MukColors, MukTheme} from '../../types';
import {SubLayout} from '../../components/layouts/SubLayout';

const PremiumCard = ({active, onPress}: {active: boolean; onPress: () => void}) => {
  const {colors} = useTheme<MukTheme>();
  const styles = makeStyles(colors, active);

  return (
    <TouchableOpacity
      style={[
        {
          width: '30%',
          height: responsiveHeight(200),
          justifyContent: 'center',
          alignItems: 'center',
          padding: responsiveWidth(8),
          borderRadius: 16,
          backgroundColor: colors.backdrop,
        },
        styles.shadow,
      ]}
      onPress={onPress}
    >
      <Text>Test Premium</Text>
    </TouchableOpacity>
  );
};

export default function PremiumScreen() {
  const {colors} = useTheme<MukTheme>();
  const [selection, setSelection] = useState(1);

  return (
    <SubLayout style={{gap: responsiveHeight(16), padding: responsiveWidth(16)}}>
      <></>
    </SubLayout>
  );
}

const makeStyles = (colors: MukColors, active: boolean) =>
  StyleSheet.create({
    shadow: {
      shadowColor: active ? colors.primary : 'rgb(138,138,138)',
      shadowOffset: {
        width: 0,
        height: active ? 4 : 3,
      },
      shadowOpacity: active ? 0.4 : 0.2,
      shadowRadius: 3,
      elevation: 0,
    },
  });
