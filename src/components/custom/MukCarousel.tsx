import {ReactNode} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

type Props = {
  data: any[];
  carousel?: ReactNode;
};

export default observer(({data, carousel}: Props) => {
  const {ui} = useStores();

  return (
    <Carousel
      loop
      width={ui.windowWidth}
      height={ui.windowWidth / 2}
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
});
