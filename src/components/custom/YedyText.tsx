import {Text, TextProps} from 'react-native';
import useTheme from '../../hooks/useTheme';
import {observer} from 'mobx-react';
import {responsiveSize} from '../../utils/util';

type fontTypes = 'reqular' | 'bold' | 'italic';

type Props = TextProps & {
  visible?: boolean;
  fontType?: fontTypes;
  fontSize?: number;
};

const fonts: Record<fontTypes, string> = {
  bold: 'ProductSans-Bold',
  reqular: 'ProductSans-Regular',
  italic: 'ProductSans-Italic',
};

export default observer(({visible = true, fontType = 'reqular', fontSize = 15, ...rest}: Props) => {
  const {colors} = useTheme();

  return (
    <Text
      {...rest}
      style={[
        {
          fontSize: responsiveSize(fontSize),
          fontFamily: fonts[fontType],
          color: colors.secondary,
          display: visible ? undefined : 'none',
        },
        rest.style,
      ]}
    >
      {rest.children}
    </Text>
  );
});
