import {
  ActivityIndicator,
  GestureResponderEvent,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {responsiveScale, responsiveSize} from '../../utils/util';
import React, {useState} from 'react';
import EditImage, {IEditImage} from '../profile/EditImage';
import {Image} from 'expo-image';
import {ImageContentFit} from 'expo-image/src/Image.types';
import {useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import {useServices} from '../../services';
import MukIconButton from './MukIconButton';

type Props = {
  source?: ImageSourcePropType;
  resizeMode?: ImageContentFit;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  scale?: number;
  radius?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  edit?: IEditImage;
};

export default function MukImage({
  source,
  resizeMode = 'contain',
  style,
  imageStyle,
  scale,
  radius = true,
  onPress,
  disabled,
  edit,
}: Props) {
  const {colors} = useTheme<MukTheme>();
  const {api} = useServices();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOnPress = (event?: GestureResponderEvent) => {
    event?.stopPropagation();
    if (!loading) {
      onPress && onPress();
      edit && setVisible(true);
    }
  };

  return (
    <View>
      {edit && !loading && (
        <MukIconButton
          scale={0.33}
          icon={'edit'}
          onPress={handleOnPress}
          style={{
            backgroundColor: api.helper.addOpacityToColor(colors.primary, 0.7),
            borderRadius: 100,
            zIndex: 1400,
            position: 'absolute',
            right: 4,
            bottom: 4,
          }}
        />
      )}
      <TouchableOpacity
        style={[
          {
            backgroundColor: 'transparent',
            width: responsiveScale(scale),
            height: responsiveScale(scale),
            aspectRatio: 1,
            borderRadius: radius ? 16 : 2,
            justifyContent: 'center',
            overflow: 'hidden',
          },
          style,
        ]}
        disabled={(!edit && !onPress) || disabled}
        onPress={handleOnPress}
      >
        {loading ? (
          <ActivityIndicator size={responsiveSize(48)} />
        ) : (
          <Image
            source={source}
            contentFit={resizeMode}
            cachePolicy={'memory-disk'}
            style={[
              {
                width: '100%',
                height: '100%',
              },
              imageStyle,
            ]}
          />
        )}
        {edit && <EditImage setVisible={setVisible} isVisible={visible} edit={edit} setLoading={setLoading} />}
      </TouchableOpacity>
    </View>
  );
}
