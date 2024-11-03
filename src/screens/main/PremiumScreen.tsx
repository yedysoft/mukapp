import {useTheme} from '../../hooks';
import {responsiveHeight, responsiveWidth, shadowStyle} from '../../utils/util';
import {TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {SubLayout} from '../../components/layouts/SubLayout';
import {YedyText} from '../../components/custom';

const PremiumCard = ({active, onPress}: {active: boolean; onPress: () => void}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      style={[
        {
          width: '30%',
          height: responsiveHeight(200),
          justifyContent: 'center',
          alignItems: 'center',
          padding: responsiveWidth(8),
          borderRadius: 16,
          backgroundColor: colors.backdrop,
        },
        shadowStyle(),
      ]}
      onPress={onPress}
    >
      <YedyText>Test Premium</YedyText>
    </TouchableOpacity>
  );
};

export default function PremiumScreen() {
  const {colors} = useTheme();
  const [selection, setSelection] = useState(1);

  return (
    <SubLayout style={{gap: responsiveHeight(16), padding: responsiveWidth(16)}}>
      <></>
    </SubLayout>
  );
}
