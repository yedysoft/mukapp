import {Text, TextProps} from 'react-native';
import {useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import {observer} from 'mobx-react';
import {responsiveSize} from '../../utils/util';

type fontTypes = 'reqular' | 'bold' | 'italic';

type Props = TextProps & {
  visible?: boolean;
  fontType?: fontTypes;
};

const fonts: Record<fontTypes, string> = {
  bold: 'ProductSans-Bold',
  reqular: 'ProductSans-Regular',
  italic: 'ProductSans-Italic',
};

export default observer(({visible = true, fontType = 'reqular', ...rest}: Props) => {
  const {colors} = useTheme<MukTheme>();

  return (
    <Text
      {...rest}
      style={[
        {
          fontSize: responsiveSize(15),
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
