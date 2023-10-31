import {MainLayout} from '../../../components/layouts/MainLayout';
import {observer} from 'mobx-react';
import {useStores} from '../../../stores';
import {useTheme} from 'react-native-paper';
import {useServices} from '../../../services';
import SearchList from '../../../components/search/SearchList';
import {responsiveWidth} from '../../../utils/Responsive';
import MukTextInput from '../../../components/custom/MukTextInput';

export const SearchScreen = observer(() => {
  const {colors} = useTheme();
  const {api} = useServices();
  const {user} = useStores();

  const handleSearch = (name: string, value: string) => {
    api.helper.sleep(500).then(() => {
      if (value !== '') {
        api.user.searchUser(value);
      } else {
        user.set('searched', [])
      }
    });
  };

  return (
    <MainLayout>
      <SearchList
        list={user.getSearched}
        header={
          <MukTextInput
            placeholder={'Kimi aramıştın?'}
            name={'search'}
            outlineStyle={{borderColor: colors.primary}}
            onChange={handleSearch}
            style={{alignSelf: 'center', marginVertical: responsiveWidth(8)}}
          />
        }
      />
    </MainLayout>
  );
});
