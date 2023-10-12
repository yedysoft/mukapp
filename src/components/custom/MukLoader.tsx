import {useTheme} from 'react-native-paper';
import MukImage from './MukImage';

type Props = {
  isLoading?: boolean;
};

export default function MukLoader({isLoading}: Props) {
  const {colors} = useTheme();

  return isLoading ? (
    <MukImage scale={0.5} style={{alignSelf: 'center'}} source={require('../../../assets/loader.gif')} />
  ) : (
    <></>
  );
}
