import {observer} from 'mobx-react';
import {useStores} from '../../../stores';
import {useTheme} from 'react-native-paper';
import {useServices} from '../../../services';
import SearchList from '../../../components/search/SearchList';
import {responsiveWidth} from '../../../utils/util';
import MukTextInput from '../../../components/custom/MukTextInput';
import {MukTheme} from '../../../types';
import {useEffect} from 'react';
import {SubLayout} from '../../../components/layouts/SubLayout';

export const SearchScreen = observer(() => {
  const {colors} = useTheme<MukTheme>();
  const {api, t} = useServices();
  const {user} = useStores();

  const handleSearch = (_name: string, value: string) => {
    api.helper.sleep(500, 'searchUser').then(() => {
      if (value !== '') {
        api.user.searchUser(value);
      } else {
        user.set('searched', []);
      }
    });
  };

  useEffect(() => {
    user.set('searched', []);
  }, []);

  return (
    <SubLayout>
      <SearchList
        list={user.getSearched}
        header={
          <MukTextInput
            placeholder={t.do('main.search.placeholder')}
            name={'search'}
            underlineStyle={{backgroundColor: colors.primary, opacity: 0.5}}
            onCustomChange={handleSearch}
            viewStyle={{marginVertical: responsiveWidth(8)}}
          />
        }
      />
    </SubLayout>
  );
});
