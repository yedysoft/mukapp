import {useTheme} from '../../hooks';
import {responsiveWidth} from '../../utils/util';
import {YedyListItem, YedyText} from '../custom';

type Props = {
  label?: string;
  onPress?: () => void;
};

export default function PsListItem({label, onPress}: Props) {
  const {colors} = useTheme();

  return (
    <YedyListItem
      onPress={onPress}
      style={{
        backgroundColor: colors.shadow,
        borderRadius: 16,
        paddingHorizontal: responsiveWidth(20),
        paddingVertical: responsiveWidth(20),
        alignItems: 'center',
        borderBottomWidth: 0,
      }}
    >
      <YedyText size={15}>{label}</YedyText>
    </YedyListItem>
  );
}
