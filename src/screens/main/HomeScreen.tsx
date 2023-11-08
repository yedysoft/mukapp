import {MainLayout} from '../../components/layouts/MainLayout';
import HomeTabs from '../../components/home/HomeTabs';
import CreateRoom from '../../components/home/CreateRoom';

export default function HomeScreen() {
  return (
    <MainLayout>
      <HomeTabs/>
      <CreateRoom/>
    </MainLayout>
  );
}
