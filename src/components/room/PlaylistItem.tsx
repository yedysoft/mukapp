import {MD3Theme, Text, useTheme} from 'react-native-paper';
import MukImage from '../../components/custom/MukImage';
import {responsiveHeight, responsiveSize, responsiveWidth, screenWidth} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';
import {StyleSheet, TouchableOpacity} from 'react-native';

type Props = {
  onPress?: () => void;
  playlist?: {
    image?: string;
    name?: string;
  };
};

export default function PlaylistItem({onPress, playlist}: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);

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

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    shadow: {
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 0,
    },
  });
