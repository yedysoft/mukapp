import {MD3Theme, Text, useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {StyleSheet, TouchableOpacity} from 'react-native';

type Props = {
  onPress?: () => void;
  active?: boolean;
  playlist?: {
    image?: string;
    name?: string;
  };
};

export default function PlaylistItem({onPress, active, playlist}: Props) {
  const theme = useTheme();
  const styles = makeStyles({theme, active});

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          flexDirection: 'column',
          backgroundColor: theme.colors.background,
          height: responsiveWidth(160),
          borderRadius: 16,
          justifyContent: 'space-between',
          padding: responsiveWidth(8),
        },
        styles.shadow,
      ]}
    >
      <MukImage scale={1.8} source={require('../../../assets/adaptive-icon.png')} />
      <Text numberOfLines={1} style={{fontSize: responsiveSize(14), fontWeight: '400'}}>
        {playlist?.name}
      </Text>
    </TouchableOpacity>
  );
}

type SProps = {
  theme: MD3Theme;
  active?: boolean;
};

const makeStyles = ({theme, active}: SProps) =>
  StyleSheet.create({
    shadow: {
      shadowColor: active ? theme.colors.primary : 'rgb(138,138,138)',
      shadowOffset: {
        width: 0,
        height: active ? 4 : 3,
      },
      shadowOpacity: active ? 0.4 : 0.2,
      shadowRadius: 3,
      elevation: 0,
    },
  });
