import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import TokenExchange from '../../components/task/TokenExchange';
import TasksList from '../../components/task/TasksList';
import {MukTheme} from '../../types';

export default function TaskScreen() {
  const {colors} = useTheme<MukTheme>();

  return (
    <MainLayout style={{gap: responsiveHeight(16), padding: responsiveWidth(16)}}>
      <TokenExchange />
      <TasksList tasks={[...Array(5)]} />
    </MainLayout>
  );
}
