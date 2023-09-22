import AuthLayout from '../../components/layouts/AuthLayout';
import {observer} from 'mobx-react';
import {AuthLoginForm} from '../../components/form/AuthLoginForm';

export const LoginScreen = observer(() => {
  return (
    <AuthLayout>
      <AuthLoginForm />
    </AuthLayout>
  );
});
