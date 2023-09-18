import {useTheme} from 'react-native-paper';
import {View} from 'react-native';

export default function MainHeader() {
  const {colors} = useTheme();

  return (
    <View style={{backgroundColor: colors.primary, height: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

    </View>
  );
}
