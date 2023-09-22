import {MD3Theme, Text, useTheme} from 'react-native-paper';
import {ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';
import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/Responsive';
import MukImage from '../../components/custom/MukImage';
import MukProgressBar from '../../components/custom/MukProgressBar';

type Props = {
  compact?: boolean;
};

export default function PlayingTrack({compact}: Props) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <ImageBackground
      resizeMode={'cover'}
      style={{
        width: '100%',
        height: responsiveHeight(compact ? 88 : 280),
        justifyContent: 'flex-end',
        padding: responsiveWidth(compact ? 8 : 16),
        backgroundColor: theme.colors.background,
        position: compact ? 'absolute' : 'relative',
        bottom: 0,
      }}
      imageStyle={{opacity: 0.5, borderRadius: compact ? 16 : 0}}
      source={require('../../../assets/logo.png')}
    >
      <TouchableOpacity
        disabled={!compact}
        onPress={() => console.log('Odaya Dön')}
        style={{flexDirection: 'row', gap: responsiveWidth(16), marginBottom: responsiveHeight(compact ? 8 : 16)}}
      >
        <MukImage scale={compact ? 1 : 2} source={require('../../../assets/adaptive-icon.png')} />
        <View
          style={{flexDirection: 'column', justifyContent: 'flex-end', gap: responsiveWidth(4), paddingBottom: responsiveWidth(compact ? 8 : 16)}}
        >
          <Text style={{fontSize: responsiveSize(compact ? 16 : 20), fontWeight: '500'}}>Şarkı Adı</Text>
          <Text style={{fontSize: responsiveSize(compact ? 12 : 16), fontWeight: '300'}}>Sanatçı</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.shadow}>
        <MukProgressBar progress={1} />
      </View>
    </ImageBackground>
  );
}

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    shadow: {
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 0,
    },
  });
