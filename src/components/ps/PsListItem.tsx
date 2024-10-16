import {useTheme} from '../../hooks';
import {responsiveWidth} from '../../utils/util';
import {YedyListItem, YedyText} from '../custom';
import {useServices} from '../../services';

type Props = {
  label?: string;
  onPress?: () => void;
};

export default function PsListItem({label, onPress}: Props) {
  const {colors} = useTheme();
  const {api} = useServices();

  return (
    <YedyListItem
      onPress={onPress}
      style={{
        backgroundColor: api.helper.hexToRgba(colors.secondary, 0.03),
        borderRadius: 16,
        paddingHorizontal: responsiveWidth(20),
        paddingVertical: responsiveWidth(20),
        alignItems: 'center',
      }}
    >
      <YedyText size={18}>{label}</YedyText>
    </YedyListItem>
  );
}
