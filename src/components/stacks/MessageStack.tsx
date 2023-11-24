import {View} from 'react-native';
import {observer} from 'mobx-react';
import MukToaster from '../custom/MukToaster';
import {useStores} from '../../stores';
import {responsiveWidth} from '../../utils/util';

const MessageStack = observer(() => {
  const {ui} = useStores();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        zIndex: 1400,
        gap: responsiveWidth(8),
        width: '100%',
        marginTop: responsiveWidth(64),
        maxHeight: responsiveWidth(200),
        overflow: 'hidden',
      }}
    >
      {ui.getMessages.map(e => (
        <MukToaster key={e.id} message={e} interval={3000} />
      ))}
    </View>
  );
});

export default MessageStack;
