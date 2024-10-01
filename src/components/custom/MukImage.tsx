import {Image, ImageResizeMode, ImageSourcePropType, ImageStyle, Pressable, View} from 'react-native';
import {responsiveScale} from '../../utils/util';
import React, {useState} from 'react';
import EditImage, {IEditImage} from '../profile/EditImage';
import MukIcon from './MukIcon';

type Props = {
  source?: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
  style?: ImageStyle;
  scale?: number;
  radius?: boolean;
  onPress?: () => void;
  edit?: IEditImage;
};

export default function MukImage({source, resizeMode = 'contain', style, scale, radius = true, onPress, edit}: Props) {
  const [visible, setVisible] = useState(false);

  const handleOnPress = () => {
    onPress && onPress();
    setVisible(true);
  };

  if (source) {
    return (
      <Pressable style={{borderRadius: radius ? 16 : 2}} onPress={handleOnPress}>
        {edit && (
          <MukIcon scale={0.5} icon={'edit'} iconStyle={{zIndex: 1400, position: 'absolute', right: 0, bottom: 0}} />
        )}
        <Image
          source={source}
          resizeMode={resizeMode}
          style={[
            {
              backgroundColor: 'transparent',
              width: responsiveScale(scale),
              height: responsiveScale(scale),
              aspectRatio: 1,
              borderRadius: radius ? 16 : 2,
            },
            style,
          ]}
        />
        {edit && <EditImage setVisible={setVisible} isVisible={visible} edit={edit} />}
      </Pressable>
    );
  } else {
    return (
      <View
        style={[
          {
            backgroundColor: 'transparent',
            width: responsiveScale(scale),
            height: responsiveScale(scale),
            aspectRatio: 1,
            borderRadius: radius ? 16 : 2,
          },
          style,
        ]}
      />
    );
  }
}
