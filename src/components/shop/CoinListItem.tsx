import {MD3Theme, Text, useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {StyleSheet, TouchableOpacity} from 'react-native';

type Props = {
  onPress?: () => void;
  coin?: {
    value?: number;
    price?: number;
  };
};

export default function CoinListItem({onPress, coin}: Props) {
  const theme = useTheme();
  const styles = makeStyles({theme});

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: theme.colors.background,
          height: responsiveWidth(140),
          aspectRatio: 1,
          alignItems: 'center',
          borderRadius: 16,
          justifyContent: 'center',
          padding: responsiveWidth(8),
        },
        styles.shadow,
      ]}
    >
      <MukImage scale={1.2} source={require('../../../assets/new-coin.png')} />
      <Text
        numberOfLines={1}
        style={{
          fontSize: responsiveSize(32),
          fontWeight: '900',
          position: 'absolute',
          color: 'white',
          right: responsiveWidth(24),
          bottom: responsiveWidth(24),
          textAlign: 'right',
        }}
      >
        {coin?.value}
      </Text>
    </TouchableOpacity>
  );
}

type SProps = {
  theme: MD3Theme;
};

const makeStyles = ({theme}: SProps) =>
  StyleSheet.create({
    shadow: {
      shadowColor: 'rgba(255, 159, 10, 1)',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 0,
    },
  });
