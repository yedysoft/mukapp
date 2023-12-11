import {useTheme} from 'react-native-paper';
import {View} from 'react-native';
import {MukTheme} from '../../types';
import {responsiveWidth, screenWidth} from '../../utils/util';
import MukTextInput from '../custom/MukTextInput';
import MukIconButton from '../custom/MukIconButton';

type Props = {
  name: string;
  value: string;
  handleOnChange: () => void;
};

export default function ChatComposer({name, value, handleOnChange}: Props) {
  const {colors} = useTheme<MukTheme>();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: responsiveWidth(4),
        padding: responsiveWidth(16),
        paddingRight: responsiveWidth(8),
        width: screenWidth,
      }}
    >
      <MukTextInput name={name} value={value} onChange={handleOnChange} mode={'outlined'} style={{flex: 1}} />
      <MukIconButton icon={'send'} scale={0.4} color={colors.secondary} />
    </View>
  );
}
