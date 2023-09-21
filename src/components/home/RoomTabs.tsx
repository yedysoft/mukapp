import {useTheme} from 'react-native-paper';
import MukTabs from "../../components/custom/MukTabs";
import RoomList from "../../components/home/RoomList";

const roomsData = [
  {
    name: 'Oda Adı 1',
    username: 'user1'
  },
  {
    name: 'Oda Adı 2',
    username: 'user2'
  },
  {
    name: 'Oda Adı 1',
    username: 'user1'
  },
  {
    name: 'Oda Adı 2',
    username: 'user2'
  },
]

export default function RoomTabs() {
  const theme = useTheme();

  return (
    <MukTabs tabs={[
      {
        children: <RoomList rooms={roomsData}/>
      },
      {
        children: <RoomList rooms={roomsData}/>
      },
    ]}/>
  );
}
