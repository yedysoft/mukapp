import MukTabs from '../../components/custom/MukTabs';
import RoomList from '../../components/home/RoomList';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import {useEffect, useState} from 'react';

const HomeTabs = observer(() => {
  const [tabIndex, setTabIndex] = useState(0);
  const {rooms} = useStores();
  const {api} = useServices();

  useEffect(() => {
    const intervalId = setInterval(() => {
      api.rooms.getRooms(tabIndex === 0 ? 'PLACE' : 'ADMIN');
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <MukTabs
      onChangeIndex={(index: number) => setTabIndex(index)}
      tabs={[
        {
          icon: 'home-group',
          children: <RoomList rooms={rooms.getPlaces} />,
        },
        {
          icon: 'account-group',
          children: <RoomList rooms={rooms.getUsers} />,
        },
      ]}
    />
  );
});

export default HomeTabs;
