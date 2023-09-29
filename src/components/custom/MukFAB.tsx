import {FAB, MD3Theme, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {StyleSheet} from 'react-native';

type Props = {
  onPress?: () => void;
};

export default function MukFAB({onPress}: Props) {
  const theme = useTheme();
  const styles = makeStyles({theme});

  return (
    <FAB
      icon="plus"
      color={theme.colors.background}
      customSize={responsiveSize(64)}
      style={[{position: 'absolute', backgroundColor: theme.colors.primary, bottom: responsiveWidth(16), right: responsiveWidth(16), borderRadius: 100}, styles.shadow]}
      onPress={onPress}
    />
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
      shadowOpacity: .5,
      shadowRadius: 8,
      elevation: 0,
    },
  });
