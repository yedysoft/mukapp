import {View} from 'react-native';
import {observer} from 'mobx-react';
import MukToaster from '../../components/custom/MukToaster';
import {useStores} from '../../stores';

const ErrorScreen = observer(() => {
  const {ui} = useStores();

  return (
    <View style={{zIndex: 1400}}>
      {ui.getNotShowingErrors.map((e, i) => (
        <MukToaster key={i} error={e} interval={3000} />
      ))}
    </View>
  );
});

export default ErrorScreen;
