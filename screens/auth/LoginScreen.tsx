import {Text, useTheme} from 'react-native-paper';
import AuthLayout from '../../components/layouts/AuthLayout';

export default function LoginScreen() {
  const {colors} = useTheme();

  return (
    <AuthLayout>
      <Text>Login</Text>
    </AuthLayout>
  );
}
