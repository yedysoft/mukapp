import {View} from 'react-native';
import {observer} from 'mobx-react';
import MukToaster from '../custom/MukToaster';
import {useStores} from '../../stores';
import {responsiveWidth} from '../../utils/Responsive';

const ErrorStack = observer(() => {
  const {ui} = useStores();

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      position: 'absolute',
      zIndex: 1400,
      gap: responsiveWidth(8),
      width: '100%',
      marginTop: responsiveWidth(64),
      maxHeight: responsiveWidth(200),
      overflow: 'hidden',
    }}>
      {ui.getNotShowingErrors.map((e, i) => (
        <MukToaster key={i} error={e} interval={5000}/>
      ))}
    </View>
  );
});

export default ErrorStack;
