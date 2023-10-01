import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';
import MukIcon from '../custom/MukIcon';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {useNavigation} from '@react-navigation/native';

type Props = {
  item: {
    icon: IconSource;
    label: string;
    route: string;
  };
};

export default function MenuListItem({item}: Props) {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <MukListItem onPress={() => navigation.navigate(item.route)} style={{alignItems: 'center', paddingVertical: responsiveWidth(2)}}>
      <MukIcon scale={0.8} icon={item.icon} />
      <Text numberOfLines={1} style={{fontSize: responsiveSize(20), fontWeight: '600', marginLeft: responsiveWidth(-8)}}>
        {item.label}
      </Text>
    </MukListItem>
  );
}
