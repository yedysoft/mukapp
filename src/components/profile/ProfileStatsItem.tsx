import {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';

type Props = {
  stat: {
    value: string;
    label: string;
  }
};

export default function ProfileStatsItem({stat}: Props) {
  const theme = useTheme();

  return (
    <View style={{flexDirection: 'column', alignItems: 'center', width: responsiveWidth(128)}}>
      <Text style={{fontSize: responsiveSize(18), fontWeight: 'bold', color: theme.colors.primary}}>{stat.value}</Text>
      <Text style={{fontSize: responsiveSize(14), fontWeight: 'bold', color: theme.colors.onSurfaceVariant}}>{stat.label}</Text>
    </View>
  );
}
