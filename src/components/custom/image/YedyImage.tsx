import {
  ActivityIndicator,
  GestureResponderEvent,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {responsiveScale, responsiveSize, responsiveWidth} from '../../../utils/util';
import React, {useRef, useState} from 'react';
import EditImage, {IEditImage} from './YedyEditImage';
import {Image} from 'expo-image';
import {ImageContentFit} from 'expo-image/src/Image.types';
import {useTheme} from '../../../hooks';
import YedyIconButton, {YedyIconButtonRef} from '../YedyIconButton';

type Props = {
  source?: ImageSourcePropType;
  resizeMode?: ImageContentFit;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  scale?: number;
  radius?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  visible?: boolean;
  edit?: IEditImage;
};

export default ({
  source,
  resizeMode = 'contain',
  style,
  imageStyle,
  scale = 1,
  radius = true,
  onPress,
  disabled,
  visible = true,
  edit,
}: Props) => {
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const ref = useRef<YedyIconButtonRef>(null);
  const flattenedViewStyle = StyleSheet.flatten(style) || {};
  const borderRadius = (flattenedViewStyle.borderRadius as number) || (radius ? 16 : 2);

  const handleOnPress = (event?: GestureResponderEvent) => {
    event?.stopPropagation();
    ref.current?.openModalOrTooltip();
    onPress && onPress();
  };

  return (
    <View
      style={[
        {
          display: visible ? undefined : 'none',
          backgroundColor: 'transparent',
          height: responsiveScale(scale),
          aspectRatio: 1,
          borderRadius,
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {edit && !loading && (
        <YedyIconButton
          ref={ref}
          scale={0.25}
          icon={'image-edit'}
          modal={EditImage}
          tooltipOrModalData={{edit: edit, setLoading: setLoading}}
          color={colors.dark}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 100,
            zIndex: 1400,
            position: 'absolute',
            right: responsiveWidth(4),
            bottom: responsiveWidth(4),
          }}
        />
      )}
      <TouchableOpacity
        style={{flex: 1, overflow: 'hidden', borderRadius: borderRadius - 2}}
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
};