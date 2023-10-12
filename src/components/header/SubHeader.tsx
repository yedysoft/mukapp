import {useTheme} from 'react-native-paper';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import MukIconButton from '../custom/MukIconButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {NavButton} from './NavButton';
import Token from '../user/Token';

export const SubHeader = observer(() => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'transparent',
        paddingHorizontal: responsiveWidth(8),
        paddingRight: responsiveWidth(24),
        paddingTop: responsiveHeight(16),
        paddingBottom: responsiveHeight(-16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <NavButton>
        <MukIconButton icon={'chevron-left'} scale={0.7} onPress={() => navigation.goBack()} />
      </NavButton>
      {route.name == 'Task' ? (
        <Token style={{justifyContent: 'flex-end', width: responsiveWidth(56), marginRight: responsiveWidth(-8)}} />
      ) : null}
    </SafeAreaView>
  );
});
