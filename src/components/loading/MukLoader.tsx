import {useTheme} from 'react-native-paper';
import MukImage from '../custom/MukImage';
import {MukTheme} from '../../types';

type Props = {
  loading: boolean;
  scale?: number;
};

export default function MukLoader({loading, scale}: Props) {
  const {colors} = useTheme<MukTheme>();

  return loading ? (
    <MukImage scale={scale ?? 0.5} style={{alignSelf: 'center'}} source={require('../../../assets/loader.gif')} />
  ) : (
    <></>
  );
}
