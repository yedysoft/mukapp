import useTheme from '../../hooks/useTheme';
import MukImage from '../custom/MukImage';

type Props = {
  loading: boolean;
  scale?: number;
};

export default function MukLoader({loading, scale}: Props) {
  const {colors} = useTheme();

  return (
    <MukImage
      scale={scale ?? 0.5}
      style={{alignSelf: 'center', display: loading ? undefined : 'none'}}
      source={require('../../../assets/loader.gif')}
    />
  );
}
