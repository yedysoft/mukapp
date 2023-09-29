import {Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import ShopSection from '../../components/shop/ShopSection';
import MukImage from '../../components/custom/MukImage';
import {ReactNode} from 'react';

export default function ShopWallet() {
  const {colors} = useTheme();

  const WalletSection = ({children}: {children: ReactNode}) => {
    return <View style={{flexDirection: 'row', alignItems: 'center'}}>{children}</View>;
  };

  const WalletText = ({value}: {value: string}) => {
    return (
      <Text
        style={{
          fontSize: responsiveSize(48),
          color: 'white',
          fontWeight: '700',
          textAlign: 'right',
        }}
      >
        {value}
      </Text>
    );
  };

  return (
    <ShopSection title={'Cüzdan'}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <WalletSection>
          <WalletText value={'120'} />
          <MukImage scale={0.66} source={require('../../../assets/new-coin.png')} style={{alignSelf: 'center', marginLeft: responsiveWidth(8)}} />
        </WalletSection>
        <WalletSection>
          <WalletText value={'1.2K'} />
          <MukImage scale={1} source={require('../../../assets/coin.png')} style={{alignSelf: 'center', marginHorizontal: responsiveWidth(-4)}} />
        </WalletSection>
      </View>
    </ShopSection>
  );
}
