import {Image, ImageSourcePropType, ImageStyle, Pressable, View} from 'react-native';
import {responsiveScale} from '../../utils/util';
import React, {useState} from 'react';
import EditImage from '../profile/EditImage';
import MukIcon from './MukIcon';
import {IImage} from '../../types/user';

type Props = {
  source?: ImageSourcePropType;
  style?: ImageStyle;
  scale?: number;
  radius?: boolean;
  onPress?: () => void;
  isEdit?: boolean;
  tableName?: string;
  tableId?: string;
  imageIndex?: string;
  tempId?: string;
  setImage?: (image: IImage) => void;
};

export default function MukImage({
  source,
  style,
  scale,
  radius = true,
  onPress,
  isEdit,
  tableName,
  tableId,
  imageIndex,
  tempId,
  setImage,
}: Props) {
  const [visible, setVisible] = useState(false);

  const handleOnPress = () => {
    onPress && onPress();
    setVisible(true);
  };

  if (source) {
    return (
      <Pressable style={{borderRadius: radius ? 16 : 2}} onPress={handleOnPress}>
        {isEdit && (
          <MukIcon scale={0.5} icon={'edit'} iconStyle={{zIndex: 1400, position: 'absolute', right: 0, bottom: 0}} />
        )}
        <Image
          source={source}
          resizeMode={'contain'}
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
        {isEdit && tableName && tableId && (
          <EditImage
            setVisible={setVisible}
            isVisible={visible}
            tableName={tableName}
            tableId={tableId}
            imageIndex={imageIndex}
            tempId={tempId}
            setImage={setImage}
          />
        )}
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
