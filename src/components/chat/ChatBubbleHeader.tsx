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
        paddingVertical: responsiveWidth(4),
        paddingHorizontal: responsiveWidth(8),
        display: visible ? undefined : 'none',
        marginBottom: responsiveWidth(8),
      }}
    >
      <Text style={{color: colors.secondary, fontSize: responsiveSize(15), fontWeight: '300'}}>{value}</Text>
    </View>
  );
};
