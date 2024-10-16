import {observer} from 'mobx-react';
import {useStores} from '../../../stores';
import {useServices} from '../../../services';
import SearchList from '../../../components/search/SearchList';
import {responsiveWidth} from '../../../utils/util';
import {YedyTextInput} from '../../../components/custom';
import {useEffect} from 'react';
import {SubLayout} from '../../../components/layouts/SubLayout';

export const SearchScreen = observer(() => {
  const {api, t} = useServices();
  const {user} = useStores();

  const handleSearch = (_name: string, value: string | number) => {
    api.helper.sleep(500, 'searchUser').then(() => {
      if (value !== '') {
        api.user.searchUser(String(value));
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
          <YedyTextInput
            placeholder={t.do('main.search.placeholder')}
            name={'search'}
            onCustomChange={handleSearch}
            viewStyle={{marginVertical: responsiveWidth(8)}}
          />
        }
      />
    </SubLayout>
  );
});
