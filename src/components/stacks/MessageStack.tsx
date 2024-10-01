import {View} from 'react-native';
import {observer} from 'mobx-react';
import {responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import MukToaster from '../custom/MukToaster';
import {Portal} from 'react-native-paper';

export default observer(() => {
  const {ui} = useStores();

  return (
    <Portal>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          position: 'absolute',
          gap: responsiveWidth(8),
          width: '100%',
          marginTop: responsiveWidth(64),
          zIndex: 1400,
        }}
      >
        {ui.getMessages.map((e, _) => (
          <MukToaster key={e.id} message={e} />
        ))}
      </View>
    </Portal>
  );
});
