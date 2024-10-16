import RoomList from '../../components/home/RoomList';
import {useServices} from '../../services';
import {useState} from 'react';
import {YedyChipTabs} from '../custom';

export default function () {
  const [tabIndex, setTabIndex] = useState(0);
  const {t} = useServices();

  return (
    <YedyChipTabs
      onChangeIndex={(index: number) => setTabIndex(index)}
      activeIndex={tabIndex}
      tabs={[
        {
          label: t.do('main.home.places'),
          children: <RoomList type={'PLACE'} />,
        },
        {
          label: t.do('main.home.streamers'),
          children: <RoomList type={'STREAMER'} />,
        },
      ]}
    />
  );
}
