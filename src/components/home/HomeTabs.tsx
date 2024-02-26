import RoomList from '../../components/home/RoomList';
import {observer} from 'mobx-react';
import {useStores} from '../../stores';
import {useServices} from '../../services';
import {useEffect, useState} from 'react';
import MukChipTabs from '../custom/MukChipTabs';

const HomeTabs = observer(() => {
  const [tabIndex, setTabIndex] = useState(0);
  const {room} = useStores();
  const {api} = useServices();

  useEffect(() => {
    const intervalId = setInterval(() => {
      api.room.getRooms(tabIndex === 0 ? 'PLACE' : 'STREAMER');
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [tabIndex]);

  return (
    <MukChipTabs
      onChangeIndex={(index: number) => setTabIndex(index)}
      activeIndex={tabIndex}
      tabs={[
        {
          label: 'Mekanlar',
          children: <RoomList rooms={room.getPlaces} />,
        },
        {
          label: 'Kullanıcılar',
          children: <RoomList rooms={room.getUsers} />,
        },
      ]}
    />
  );
});

export default HomeTabs;
