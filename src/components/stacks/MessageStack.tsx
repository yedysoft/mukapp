import {View} from 'react-native';
import {observer} from 'mobx-react';
import {responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import MukToaster from '../custom/MukToaster';

const MessageStack = observer(() => {
  const {ui} = useStores();
  console.log('MessageStackRender');

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
      {ui.getMessages.map((e, _) => (
        <MukToaster key={e.id} message={e} />
      ))}
    </View>
  );
});

export default MessageStack;
