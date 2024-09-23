import AuthLayout from '../../components/layouts/AuthLayout';
import {observer} from 'mobx-react';
import React from 'react';
import NewPassForm from '../../components/form/NewPassForm';

export default observer(() => {
  return (
    <AuthLayout>
      <NewPassForm />
    </AuthLayout>
  );
});
