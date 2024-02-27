import {useTheme} from 'react-native-paper';
import {responsiveWidth} from '../../utils/util';
import {MukTheme} from '../../types';
import {AuthEditForm} from '../../components/form/AuthEditForm';
import {SubLayout} from '../../components/layouts/SubLayout';

export default function EditScreen() {
  const {colors} = useTheme<MukTheme>();

  return (
    <SubLayout style={{paddingHorizontal: responsiveWidth(20)}}>
      <AuthEditForm />
    </SubLayout>
  );
}
