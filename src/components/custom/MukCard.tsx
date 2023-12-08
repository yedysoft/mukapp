import {Text, useTheme} from 'react-native-paper';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {MukTheme} from '../../types';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {ReactNode} from 'react';

type Props = {
  cardStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title?: string;
  children: ReactNode;
};

export default function MukCard({title, cardStyle, contentStyle, titleStyle, children}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <View
      style={[
        {
          flexDirection: 'column',
          backgroundColor: colors.backdrop,
          width: '100%',
          borderRadius: 16,
          padding: responsiveWidth(8),
          paddingHorizontal: responsiveWidth(16),
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
          <Text
            style={[
              {
                color: colors.secondary,
                fontSize: responsiveSize(18),
                fontWeight: '300',
              },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
      <View
        style={[
          {
            width: '100%',
            paddingVertical: responsiveWidth(8),
            paddingHorizontal: responsiveWidth(16),
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
}
