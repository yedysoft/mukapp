import AuthLayout from '../../components/layouts/AuthLayout';
import {observer} from 'mobx-react';
import {AuthRegisterForm} from '../../components/form/AuthRegisterForm';

export const RegisterScreen = observer(() => {
  return (
    <AuthLayout>
      <AuthRegisterForm/>
    </AuthLayout>
  );
});
