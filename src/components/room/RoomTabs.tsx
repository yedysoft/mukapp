import {useTheme} from 'react-native-paper';
import MukTabs from '../../components/custom/MukTabs';
import SongList from './SongList';
import PlaylistList from './PlaylistList';
import {MukChat} from '../custom/MukChat';

const songsData = [
  {
    image: '',
    name: 'Şarkı Adı 1',
    artist: 'artist1',
  },
  {
    image: '',
    name: 'Şarkı Adı 2',
    artist: 'artist2',
  },
  {
    image: '',
    name: 'Şarkı Adı 1',
    artist: 'artist1',
  },
  {
    image: '',
    name: 'Şarkı Adı 2',
    artist: 'artist2',
  },
  {
    image: '',
    name: 'Şarkı Adı 1',
    artist: 'artist1',
  },
  {
    image: '',
    name: 'Şarkı Adı 2',
    artist: 'artist2',
  },
];
const playlistData = [
  {
    image: '',
    name: 'playlist1',
    playlist: [
      {
        image: '',
        name: 'Şarkı Adı 1',
        artist: 'artist1',
      },
      {
        image: '',
        name: 'Şarkı Adı 2',
        artist: 'artist2',
      },
      {
        image: '',
        name: 'Şarkı Adı 1',
        artist: 'artist1',
      },
      {
        image: '',
        name: 'Şarkı Adı 2',
        artist: 'artist2',
      },
      {
        image: '',
        name: 'Şarkı Adı 1',
        artist: 'artist1',
      },
      {
        image: '',
        name: 'Şarkı Adı 2',
        artist: 'artist2',
      },
    ],
  },
  {
    image: '',
    name: 'playlist2',
    playlist: [
      {
        image: '',
        name: 'Şarkı Adı 12',
        artist: 'artist1',
      },
      {
        image: '',
        name: 'Şarkı Adı 22',
        artist: 'artist2',
      },
      {
        image: '',
        name: 'Şarkı Adı 1',
        artist: 'artist1',
      },
      {
        image: '',
        name: 'Şarkı Adı 2',
        artist: 'artist2',
      },
      {
        image: '',
        name: 'Şarkı Adı 1',
        artist: 'artist1',
      },
      {
        image: '',
        name: 'Şarkı Adı 2',
        artist: 'artist2',
      },
    ],
  },
  {
    image: '',
    name: 'playlist2',
    playlist: [
      {
        image: '',
        name: 'Şarkı Adı 13',
        artist: 'artist1',
      },
      {
        image: '',
        name: 'Şarkı Adı 23',
        artist: 'artist2',
      },
      {
        image: '',
        name: 'Şarkı Adı 1',
        artist: 'artist1',
      },
      {
        image: '',
        name: 'Şarkı Adı 2',
        artist: 'artist2',
      },
      {
        image: '',
        name: 'Şarkı Adı 1',
        artist: 'artist1',
      },
      {
        image: '',
        name: 'Şarkı Adı 2',
        artist: 'artist2',
      },
    ],
  },
];

export default function RoomTabs() {
  const theme = useTheme();

  return (
    <MukTabs
      defaultIndex={1}
      tabs={[
        {
          icon: 'message-outline',
          children: (
            <MukChat
              subDestination={'/room/3c7c9b06-c3a5-450c-91f5-5da61cb2f4b8/publicChat'}
              sendDestination={'/app/room/3c7c9b06-c3a5-450c-91f5-5da61cb2f4b8/sendPublicMessage'}
            />
          ),
        },
        {
          icon: 'earth',
          children: <SongList songs={songsData} />,
        },
        {
          icon: 'account-group-outline',
          children: <PlaylistList playlists={playlistData} />,
        },
      ]}
    />
  );
}
