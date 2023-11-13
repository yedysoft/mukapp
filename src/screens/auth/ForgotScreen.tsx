import AuthLayout from '../../components/layouts/AuthLayout';
import {observer} from 'mobx-react';
import {AuthForgotForm} from '../../components/form/AuthForgotForm';

export const ForgotScreen = observer(() => {
  return (
    <AuthLayout>
      <AuthForgotForm/>
    </AuthLayout>
  );
});
