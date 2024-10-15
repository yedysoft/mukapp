import useTheme from '../../hooks/useTheme';
import {responsiveHeight, responsiveWidth} from '../../utils/util';
import TokenExchange from '../../components/task/TokenExchange';
import TasksList from '../../components/task/TasksList';
import {SubLayout} from '../../components/layouts/SubLayout';

export default function TaskScreen() {
  const {colors} = useTheme();

  return (
    <SubLayout style={{gap: responsiveHeight(16), padding: responsiveWidth(16)}}>
      <TokenExchange />
      <TasksList tasks={[...Array(5)]} />
    </SubLayout>
  );
}
