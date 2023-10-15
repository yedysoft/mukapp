import {useTheme} from 'react-native-paper';
import MukImage from './MukImage';

type Props = {
  loading: boolean;
};

export default function MukLoader({loading}: Props) {
  const {colors} = useTheme();

  return loading ? (
    <MukImage scale={0.5} style={{alignSelf: 'center'}} source={require('../../../assets/loader.gif')} />
  ) : (
    <></>
  );
}
