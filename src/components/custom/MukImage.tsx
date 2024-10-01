import {ActivityIndicator, ImageSourcePropType, ImageStyle, Pressable, StyleProp, ViewStyle} from 'react-native';
import {responsiveScale, responsiveSize} from '../../utils/util';
import React, {useState} from 'react';
import EditImage, {IEditImage} from '../profile/EditImage';
import MukIcon from './MukIcon';
import {Image} from 'expo-image';
import {ImageContentFit} from 'expo-image/src/Image.types';

type Props = {
  source?: ImageSourcePropType;
  resizeMode?: ImageContentFit;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  scale?: number;
  radius?: boolean;
  onPress?: () => void;
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
  edit,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOnPress = () => {
    if (!loading) {
      onPress && onPress();
      edit && setVisible(true);
    }
  };

  return (
    <Pressable
      style={[
        {
          backgroundColor: 'transparent',
          width: responsiveScale(scale),
          height: responsiveScale(scale),
          aspectRatio: 1,
          borderRadius: radius ? 16 : 2,
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={handleOnPress}
    >
      {edit && !loading && (
        <MukIcon scale={0.5} icon={'edit'} iconStyle={{zIndex: 1400, position: 'absolute', right: 0, bottom: 0}} />
      )}
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
              borderRadius: radius ? 16 : 2,
            },
            imageStyle,
          ]}
        />
      )}
      {edit && <EditImage setVisible={setVisible} isVisible={visible} edit={edit} setLoading={setLoading} />}
    </Pressable>
  );
}
