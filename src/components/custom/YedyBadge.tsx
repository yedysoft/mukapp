import {findNodeHandle, StyleProp, Text, TextStyle, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {useTheme} from '../../hooks';
import YedyText from './YedyText';
import {useServices} from '../../services';
import {responsiveWidth} from '../../utils/util';
import {useEffect, useRef, useState} from 'react';

type Props = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  badge?: number | string;
  defaultBadge?: boolean;
  scale?: number;
};
export default observer(({style, textStyle, badge, defaultBadge, scale}: Props) => {
  const {colors} = useTheme();
  const {api} = useServices();
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<Text>(null);
  console.log(textWidth);
  useEffect(() => {
    if (textRef.current) {
      const handle = findNodeHandle(textRef.current);
      if (handle) {
        console.log(handle);
        // Text'in genişliğini dinamik olarak ölç
        textRef.current.measure((x, y, width, height, pageX, pageY) => {
          console.log(x, y, width, height, pageX, pageY);
          setTextWidth(width);
        });
      }
    }
  }, [badge]);

  return (
    <View
      style={[
        {
          position: 'absolute',
          zIndex: 1400,
          backgroundColor: colors.tertiary,
          display: badge || defaultBadge ? undefined : 'none',
          padding: defaultBadge ? responsiveWidth(scale ? scale * 10 : 5) : responsiveWidth(4),
          paddingHorizontal: defaultBadge ? undefined : responsiveWidth(8),
          borderRadius: 100,
          borderWidth: responsiveWidth(2),
          borderColor: colors.background,
          right: defaultBadge ? 0 : responsiveWidth(-8),
          top: defaultBadge ? 0 : responsiveWidth(-8),
          alignItems: 'center',
          justifyContent: 'center',
          //minWidth: textWidth + responsiveWidth(16),
        },
        style,
      ]}
    >
      {!defaultBadge && badge && (
        <YedyText
          ref={textRef}
          numberOfLines={1}
          type={'bold'}
          size={scale ? scale * 20 : 14}
          color={colors.light}
          style={[textStyle]}
        >
          {typeof badge === 'number' ? api.helper.nummer(badge) : badge}
        </YedyText>
      )}
    </View>
  );
});
