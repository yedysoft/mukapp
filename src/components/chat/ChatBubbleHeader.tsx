import {Text, useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import React from 'react';
import {View} from 'react-native';

type Props = {
  visible: boolean;
  value: string;
};

export default ({visible, value}: Props) => {
  const {colors} = useTheme<MukTheme>();

  return (
    <View
      style={{
        alignSelf: 'center',
        backgroundColor: colors.shadow,
        borderRadius: 12,
        paddingVertical: responsiveWidth(8),
        paddingHorizontal: responsiveWidth(12),
        display: visible ? undefined : 'none',
        marginVertical: responsiveWidth(16),
      }}
    >
      <Text style={{color: colors.secondary, fontSize: responsiveSize(14), fontWeight: '300'}}>{value}</Text>
    </View>
  );
};
