import {Text, useTheme} from 'react-native-paper';
import {responsiveSize, responsiveWidth} from '../../utils/util';
import MukListItem from '../custom/MukListItem';
import MukIcon from '../custom/MukIcon';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {MukMenu, MukTheme} from '../../types';
import {MainStackNavProp} from '../../navigation/MainStack';
import {useServices} from '../../services';

type Props = {
  item: MukMenu;
};

export default function MenuListItem({item}: Props) {
  const {colors} = useTheme<MukTheme>();
  const navigation = useNavigation<MainStackNavProp>();
  const {t, api} = useServices();
  const [title, setTitle] = useState<{label: string; color: string}>();

  const soonTitle = () => {
    setTitle({label: t.do('error.soon'), color: colors.tertiary});
    api.helper.sleep(2000, item.route).then(() => setTitle(undefined));
  };

  return (
    <MukListItem
      onPress={() => (item.disabled ? soonTitle() : navigation.navigate(item.route, item.params))}
      style={{
        alignItems: 'center',
        paddingVertical: responsiveWidth(2),
        borderBottomWidth: 0,
        paddingRight: responsiveWidth(64),
      }}
    >
      <MukIcon scale={0.8} icon={item.icon} color={title?.color ?? colors.secondary} />
      <Text
        style={{
          fontSize: responsiveSize(20),
          fontWeight: '600',
          marginLeft: responsiveWidth(-8),
          color: title?.color ?? colors.secondary,
        }}
      >
        {title?.label ?? item.label}
      </Text>
    </MukListItem>
  );
}
