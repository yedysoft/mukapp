import MukTabs from '../../components/custom/MukTabs';
import RoomList from '../../components/home/RoomList';
import {observer} from 'mobx-react';

const HomeTabs = observer(() => {
  return (
    <MukTabs
      tabs={[
        {
          icon: 'home-group',
          children: <RoomList role={'PLACE'}/>,
        },
        {
          icon: 'account-group',
          children: <RoomList role={'USER'}/>,
        },
      ]}
    />
  );
});

export default HomeTabs;
