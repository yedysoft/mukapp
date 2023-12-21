import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import {MukTheme} from '../../types';
import MukListItem from '../custom/MukListItem';
import {useServices} from '../../services';

type Props = {
  label?: string;
  onPress?: () => void;
};

export default function PsListItem({label, onPress}: Props) {
  const {colors} = useTheme<MukTheme>();
  const {api, t} = useServices();

  return (
    <MukListItem
      onPress={onPress}
      style={{
        backgroundColor: api.helper.hexToRgba(colors.secondary, 0.03),
        borderRadius: 16,
        paddingHorizontal: responsiveWidth(20),
        paddingVertical: responsiveWidth(20),
        alignItems: 'center',
      }}
    >
      <Text style={{fontSize: responsiveSize(18), fontWeight: '500', color: colors.secondary}}>{label}</Text>
    </MukListItem>
  );
}
