import {MainLayout} from '../../components/layouts/MainLayout';
import HomeTabs from '../../components/home/HomeTabs';
import CreateRoom from '../../components/home/CreateRoom';
import TrackPlayer, { useTrackPlayerEvents, Event } from "react-native-track-player";
import {useState} from "react";
import {Text} from "react-native";

export default function HomeScreen() {
  const [trackTitle, setTrackTitle] = useState<string>();

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    if (event.type === Event.PlaybackActiveTrackChanged && event.track != null) {
      const track = await TrackPlayer.getTrack(event.index ?? 0);
      const {title} = track || {};
      setTrackTitle(title);
    }
  });

  return (
    <MainLayout>
      <Text style={{color: 'white', fontSize: 36}}>{trackTitle}</Text>
      <HomeTabs />
      <CreateRoom />
    </MainLayout>
  );
}
