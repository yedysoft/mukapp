import MukFAB from '../../components/custom/MukFAB';
import MukSheet from '../../components/custom/MukSheet';
import {useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import MukButton from '../custom/MukButton';
import {useServices} from '../../services';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {responsiveWidth} from '../../utils/Responsive';
import {useTheme} from 'react-native-paper';
import FriendsList from './FriendsList';
import {useStores} from '../../stores';

const friendsData = [
  {
    username: 'etcas',
    image: 'blank',
  },
  {
    username: 'dyuksel',
    image: 'blank',
  },
  {
    username: 'ysensoy',
    image: 'blank',
  },
  {
    username: 'lobostaff',
    image: 'blank',
  },
];

const CreateChat = observer(() => {
  const sheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();
  const {t} = useServices();
  const {colors} = useTheme();
  const {user} = useStores();

  const handleSheet = () => {
    sheetRef.current?.expand();
  };

  const createChat = async () => {
    sheetRef.current?.close();
    navigation.navigate('Chat');
  };

  const {room} = useStores();

  return (
    <>
      <MukFAB onPress={handleSheet}/>
      <MukSheet
        snaps={['70%']}
        sheetRef={sheetRef}
        containerStyle={{marginBottom: room.isLive ? 88 : 0}}
        contentStyle={{gap: responsiveWidth(16), justifyContent: 'space-between', paddingVertical: responsiveWidth(16)}}
      >
        <FriendsList friends={user.getFollows}/>
        <MukButton label={t.do('roomConfig.createRoom')} onPress={() => createChat()}/>
      </MukSheet>
    </>
  );
});

export default CreateChat;
