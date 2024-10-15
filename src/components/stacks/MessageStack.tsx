import {Platform, View} from 'react-native';
import {observer} from 'mobx-react';
import {responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import MukToaster from '../custom/MukToaster';
import YedyPortal from '../custom/YedyPortal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default observer(() => {
  const {ui} = useStores();
  const insets = useSafeAreaInsets();

  return (
    <YedyPortal>
      <View
        pointerEvents={'box-none'}
        style={{
          flexDirection: 'column',
          gap: responsiveWidth(8),
          paddingTop: responsiveWidth(20) + (Platform.OS === 'ios' ? 0 : insets.top),
          paddingHorizontal: responsiveWidth(20),
          zIndex: 1400,
        }}
      >
        {ui.getMessages.map(e => (
          <MukToaster key={e.id} message={e} />
        ))}
      </View>
    </YedyPortal>
  );
});
