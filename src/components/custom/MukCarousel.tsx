import {useTheme} from 'react-native-paper';
import {screenWidth} from '../../utils/Responsive';
import {ReactNode} from 'react';
import Carousel from 'react-native-reanimated-carousel';

type Props = {
  data: any[];
  carousel?: ReactNode;
};

export default function MukCarousel({data, carousel}: Props) {
  const theme = useTheme();

  return (
    <Carousel
      loop
      width={screenWidth}
      height={screenWidth / 2}
      autoPlay={true}
      autoPlayInterval={4000}
      mode={'parallax'}
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
      data={data}
      scrollAnimationDuration={1000}
      onSnapToItem={() => {}}
      renderItem={({index}) => {
        return <>{carousel}</>;
      }}
    />
  );
}
