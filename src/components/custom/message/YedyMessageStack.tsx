import YedyToaster from './YedyToaster';
import {Platform, View} from 'react-native';
import {observer} from 'mobx-react';
import {responsiveWidth} from '../../../utils/util';
import {useStores} from '../../../stores';
import YedyPortal from '../portal/YedyPortal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default observer(() => {
  const {ui} = useStores();
  const insets = useSafeAreaInsets();

  return (
    <YedyPortal zIndex={1400}>
      <View
        pointerEvents={'box-none'}
        style={{
          flexDirection: 'column',
          gap: responsiveWidth(8),
          paddingTop: responsiveWidth(20) + (Platform.OS === 'ios' ? 0 : insets.top),
          paddingHorizontal: responsiveWidth(20),
        }}
      >
        {ui.getMessages.map(e => (
          <YedyToaster key={e.id} message={e} />
        ))}
      </View>
    </YedyPortal>
  );
});
