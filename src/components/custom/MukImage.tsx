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
import React, {useRef, useState} from 'react';
import EditImage, {IEditImage} from '../modals/EditImage';
import {Image} from 'expo-image';
import {ImageContentFit} from 'expo-image/src/Image.types';
import {useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import {useServices} from '../../services';
import YedyIconButton, {YedyIconButtonRef} from './YedyIconButton';

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
  const [loading, setLoading] = useState(false);
  const ref = useRef<YedyIconButtonRef>(null);

  const handleOnPress = (event?: GestureResponderEvent) => {
    event?.stopPropagation();
    onPress && onPress();
    ref.current?.openModalOrTooltip();
  };

  return (
    <View>
      {edit && !loading && (
        <YedyIconButton
          ref={ref}
          scale={0.33}
          icon={'edit'}
          modal={EditImage}
          tooltipOrModalData={{edit: edit, setLoading: setLoading}}
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
          <ActivityIndicator size={responsiveSize(48)} color={colors.secondary} />
        ) : (
          <Image source={source} contentFit={resizeMode} cachePolicy={'memory-disk'} style={[{flex: 1}, imageStyle]} />
        )}
      </TouchableOpacity>
    </View>
  );
}
