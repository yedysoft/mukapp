import {Text, useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import React from 'react';

type Props = {
  visible: boolean;
  value: string;
};

export default ({visible, value}: Props) => {
  const {colors} = useTheme<MukTheme>();

  return (
    <Text
      style={{
        alignSelf: 'center',
        backgroundColor: colors.shadow,
        color: colors.secondary,
        borderRadius: 10,
        fontSize: responsiveSize(16),
        paddingVertical: responsiveWidth(4),
        paddingHorizontal: responsiveWidth(8),
        fontWeight: '300',
        display: visible ? undefined : 'none',
        marginBottom: responsiveWidth(8),
      }}
    >
      {value}
    </Text>
  );
};
