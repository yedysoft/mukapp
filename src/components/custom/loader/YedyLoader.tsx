import YedyImage from '../YedyImage';

type Props = {
  loading: boolean;
  scale?: number;
};

export default function YedyLoader({loading, scale}: Props) {
  return (
    <YedyImage
      scale={scale ?? 0.5}
      visible={loading}
      style={{alignSelf: 'center'}}
      source={require('../../../../assets/loader.gif')}
    />
  );
}
