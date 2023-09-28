import {Pressable, View} from 'react-native';
import MukImage from '../custom/MukImage';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';

type Props = {
  image: string;
  onPress: () => void;
}

export default function VerticalProfile({image, onPress}: Props) {
  const {colors} = useTheme();

  return (
    <View style={{flexDirection: 'column', alignItems: 'center', gap: responsiveWidth(16)}}>
      <Pressable onPress={onPress}>
        <MukImage
          scale={2.8}
          source={{uri: image}}
          style={{
            borderWidth: responsiveSize(4),
            borderRadius: 100,
            aspectRatio: 1,
            borderColor: colors.primary,
            backgroundColor: 'transparent',
          }}
        />
      </Pressable>
      <View style={{justifyContent: 'center', alignItems: 'center', gap: responsiveWidth(8)}}>
        <Text style={{fontSize: responsiveSize(24), fontWeight: 'bold'}}>Ethem Can Aslan</Text>
        <Text style={{fontSize: responsiveSize(16), fontWeight: '500', color: colors.onSurfaceVariant}}>@etcas</Text>
      </View>
    </View>
  );
}
