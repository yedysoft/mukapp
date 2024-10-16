import {ColorValue, Text, TextProps} from 'react-native';
import {useTheme} from '../../hooks';
import {observer} from 'mobx-react';
import {responsiveSize} from '../../utils/util';

type fontTypes = 'reqular' | 'bold' | 'italic';

type Props = TextProps & {
  visible?: boolean;
  type?: fontTypes;
  size?: number;
  color?: ColorValue;
};

const fonts: Record<fontTypes, string> = {
  bold: 'ProductSans-Bold',
  reqular: 'ProductSans-Regular',
  italic: 'ProductSans-Italic',
};

export default observer(({visible = true, type = 'reqular', size = 15, color, ...rest}: Props) => {
  const {colors} = useTheme();

  return (
    <Text
      {...rest}
      style={[
        {
          fontSize: responsiveSize(size),
          fontFamily: fonts[type],
          color: color ?? colors.secondary,
          display: visible ? undefined : 'none',
        },
        rest.style,
      ]}
    >
      {rest.children}
    </Text>
  );
});
