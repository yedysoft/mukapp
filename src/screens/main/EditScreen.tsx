import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import {responsiveWidth} from '../../utils/util';
import {MukTheme} from '../../types';
import {AuthEditForm} from '../../components/form/AuthEditForm';

export default function EditScreen() {
  const {colors} = useTheme<MukTheme>();

  return (
    <MainLayout style={{paddingHorizontal: responsiveWidth(20)}}>
      <AuthEditForm />
    </MainLayout>
  );
}
