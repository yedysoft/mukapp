import {View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {useStores} from '../../stores';
import {useServices} from '../../services';

export default function ShopCarousel() {
  const {ui} = useStores();
  const {api} = useServices();

  return (
    <Carousel
      loop
      width={ui.windowWidth}
      height={200}
      autoPlay={true}
      autoPlayInterval={4000}
      mode={'parallax'}
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
      data={[...new Array(6)]}
      scrollAnimationDuration={1000}
      renderItem={({item}) => {
        return (
          <View
            key={item}
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: api.helper.randomColor(),
              borderRadius: 8,
            }}
          />
        );
      }}
    />
  );
}
