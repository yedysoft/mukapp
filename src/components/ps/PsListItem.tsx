import {useTheme} from 'react-native-paper';
import {responsiveWidth} from '../../utils/util';
import {MukTheme} from '../../types';
import MukListItem from '../custom/MukListItem';
import {useServices} from '../../services';
import YedyText from '../custom/YedyText';

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
      <YedyText fontSize={18}>{label}</YedyText>
    </MukListItem>
  );
}
