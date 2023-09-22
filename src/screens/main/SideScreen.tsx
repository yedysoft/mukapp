import {useTheme} from 'react-native-paper';
import DrawerLayout from '../../components/layouts/DrawerLayout';
import HorizontalUser from '../../components/user/HorizontalUser';

export default function SideScreen() {
  const {colors} = useTheme();

  return (
    <DrawerLayout>
      <HorizontalUser />
    </DrawerLayout>
  );
}
