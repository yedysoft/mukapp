import {MainLayout} from '../../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import MessagesList from '../../../components/messages/MessagesList';
import CreateChat from '../../../components/messages/CreateChat';
import {useStores} from '../../../stores';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {useServices} from '../../../services';
import {useEffect, useState} from 'react';
import MukButton from '../../../components/custom/MukButton';

export const SearchScreen = observer(() => {
  const {api} = useServices();
  const {user} = useStores();

  const [userId, setUserId] = useState<string | null>('id')

  const searcher = async (keyword: string) => {
    await api.user.searchUser(keyword)
    console.log(user.getSearched)
    setUserId(user.getSearched[0]?.id)
  }

  useEffect(() => {
    searcher('yas')
    getFollowRequests()
  }, [])

  const sendFollowRequest = async (id: string) => {
    await api.user.sendFollowRequest(id)
  }

  const acceptFollowRequest = async (id: string) => {
    await api.user.acceptFollowRequest(id)
  }

  const rejectFollowRequest = async (id: string) => {
    await api.user.rejectFollowRequest(id)
  }

  const getFollowRequests = async () => {
    await api.user.getFollowRequests()
  }

  return (
    <MainLayout>
      <Text>{userId}</Text>
      <MukButton label={'Follow yasin'} onPress={() => sendFollowRequest('98155e4b-781d-4d00-b3eb-238bf1ddd57c')} />
      <MukButton label={'Accept admin'} onPress={() => acceptFollowRequest('f37d2ecb-bff4-4228-8b3c-7667cbeadba6')} />
      <MukButton label={'Reject admin'} onPress={() => rejectFollowRequest('42c6b95f-6980-4e89-87ec-d838ae24092c')} />
    </MainLayout>
  );
});

//eto - 5f5c5678-411e-4172-a14a-273e56989a39
//yasin - 98155e4b-781d-4d00-b3eb-238bf1ddd57c
//admin - 42c6b95f-6980-4e89-87ec-d838ae24092c
