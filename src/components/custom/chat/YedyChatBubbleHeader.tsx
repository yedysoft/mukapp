import {useTheme} from '../../../hooks';
import {responsiveWidth} from '../../../utils/util';
import React from 'react';
import {View} from 'react-native';
import YedyText from '../YedyText';

type Props = {
  visible: boolean;
  value: string;
};

export default ({visible, value}: Props) => {
  const {colors} = useTheme();

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
      <YedyText>{value}</YedyText>
    </View>
  );
};
