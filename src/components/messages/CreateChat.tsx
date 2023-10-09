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

  const handleSheet = () => {
    sheetRef.current?.expand();
  };

  const createChat = async () => {
    navigation.navigate('Room');
  };

  return (
    <>
      <MukFAB onPress={handleSheet} />
      <MukSheet
        snaps={['70%']}
        sheetRef={sheetRef}
        contentStyle={{gap: responsiveWidth(16), justifyContent: 'space-between', paddingVertical: responsiveWidth(16)}}
      >
        <FriendsList friends={friendsData} />
        <MukButton label={t.do('roomConfig.createRoom')} onPress={() => createChat()} />
      </MukSheet>
    </>
  );
});

export default CreateChat;
