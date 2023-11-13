import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import MukListItem from '../custom/MukListItem';
import MukIcon from '../custom/MukIcon';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

type Props = {
  item: {
    icon: IconSource;
    label: string;
    route: string;
    disabled?: boolean;
  };
};

export default function MenuListItem({item}: Props) {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [title, setTitle] = useState({label: item.label, color: colors.outlineVariant});

  const soonTitle = () => {
    setTitle({label: 'Çok yakında!', color: colors.tertiary});
    const myInterval = setInterval(() => {
      setTitle({label: item.label, color: colors.outlineVariant});
      clearInterval(myInterval);
    }, 2000);
  };

  return (
    <MukListItem
      onPress={() => (item.disabled ? soonTitle() : navigation.navigate(item.route))}
      style={{alignItems: 'center', paddingVertical: responsiveWidth(2)}}
    >
      <MukIcon scale={0.8} icon={item.icon} color={item.disabled ? title.color : colors.secondary} />
      <Text
        numberOfLines={1}
        style={{
          fontSize: responsiveSize(20),
          fontWeight: '600',
          marginLeft: responsiveWidth(-8),
          color: item.disabled ? title.color : colors.secondary,
        }}
      >
        {title.label}
      </Text>
    </MukListItem>
  );
}
