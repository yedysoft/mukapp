import {useTheme} from 'react-native-paper';
import MukImage from '../custom/MukImage';

type Props = {
  loading: boolean;
  scale?: number;
};

export default function MukLoader({loading, scale}: Props) {
  const {colors} = useTheme();

  return loading ? (
    <MukImage scale={scale ?? 0.5} style={{alignSelf: 'center'}} source={require('../../../assets/loader.gif')} />
  ) : (
    <></>
  );
}
