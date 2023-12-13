import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import {responsiveHeight, responsiveWidth} from '../../utils/util';
import {MukTheme} from '../../types';
import {AuthEditForm} from '../../components/form/AuthEditForm';

export default function EditScreen() {
  const {colors} = useTheme<MukTheme>();

  return (
    <MainLayout style={{gap: responsiveHeight(16), padding: responsiveWidth(16)}}>
      <AuthEditForm />
    </MainLayout>
  );
}
