import {useTheme} from 'react-native-paper';
import {MukTheme} from '../../types';
import {responsiveWidth} from '../../utils/util';
import React from 'react';
import {View} from 'react-native';
import YedyText from '../custom/YedyText';

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
        marginTop: responsiveWidth(16),
        marginBottom: responsiveWidth(8),
      }}
    >
      <YedyText fontSize={14}>{value}</YedyText>
    </View>
  );
};
