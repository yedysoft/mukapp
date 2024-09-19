import {MainLayout} from '../../components/layouts/MainLayout';
import HomeTabs from '../../components/home/HomeTabs';
import CreateRoom from '../../components/home/CreateRoom';
import RoomList from "../../components/home/RoomList";

export default function HomeScreen() {
  return (
    <MainLayout>
      {/*<HomeTabs/>*/}
      <RoomList type={'STREAMER'} />
      <CreateRoom />
    </MainLayout>
  );
}
