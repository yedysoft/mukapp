import {Text, useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';
import MukImage from '../custom/MukImage';

type Props = {
  notification: {
    image: string;
    context: string;
  };
};

export default function NotificationListItem({notification}: Props) {
  const {colors} = useTheme();

  return (
    <MukListItem
      style={{
        backgroundColor: 'transparent',
        gap: responsiveWidth(8),
        alignItems: 'center',
        marginVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(16),
      }}
    >
      <MukImage
        scale={0.6}
        source={require('../../../assets/adaptive-icon.png')}
        style={{backgroundColor: colors.secondary, borderWidth: 0.5, borderRadius: 100, borderColor: colors.background}}
      />
      <Text numberOfLines={2} style={{color: colors.secondary, maxWidth: responsiveWidth(120)}}>
        {notification.context}
      </Text>
    </MukListItem>
  );
}
