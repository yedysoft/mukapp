import AuthLayout from '../../components/layouts/AuthLayout';
import {observer} from 'mobx-react';
import {AuthRegisterForm} from '../../components/form/AuthRegisterForm';
import {View} from 'react-native';
import MukDatePicker from '../../components/custom/MukDatePicker';
import {responsiveHeight} from '../../utils/Responsive';

export const RegisterScreen = observer(() => {
  return (
    <AuthLayout>
      <AuthRegisterForm />
    </AuthLayout>
  );
});
