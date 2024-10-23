import {useTheme} from '../../hooks';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {ReactNode} from 'react';
import YedyText from './YedyText';

type Props = {
  cardStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title?: string;
  children?: ReactNode;
};

export default ({title, cardStyle, contentStyle, titleStyle, children}: Props) => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'column',
          backgroundColor: colors.shadow,
          width: '100%',
          borderRadius: 16,
          padding: responsiveWidth(16),
          paddingHorizontal: responsiveWidth(20),
          gap: responsiveWidth(8),
        },
        cardStyle,
      ]}
    >
      {title && (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <YedyText type={'bold'} size={16} style={titleStyle}>
            {title}
          </YedyText>
        </View>
      )}
      <View
        style={[
          {
            width: '100%',
            paddingVertical: responsiveWidth(8),
            justifyContent: 'center',
            alignItems: 'center',
          },
          contentStyle,
        ]}
      >
        {children}
      </View>
    </View>
  );
};
