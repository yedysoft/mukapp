import {MD3Theme, Text, useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import {responsiveHeight, responsiveWidth} from '../../utils/Responsive';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';

const PremiumCard = ({active, onPress}: {active: boolean; onPress: () => void}) => {
  const theme = useTheme();
  const styles = makeStyles({theme, active});

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
          backgroundColor: theme.colors.backdrop,
        },
        styles.shadow,
      ]}
      onPress={onPress}
    >
      <Text>Test Premium</Text>
    </TouchableOpacity>
  );
};

export default function PremiumScreen() {
  const {colors} = useTheme();
  const [selection, setSelection] = useState(1);

  return (
    <MainLayout style={{gap: responsiveHeight(16), padding: responsiveWidth(16)}}>
      <Text>Premium</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: responsiveWidth(8),
        }}
      >
        {[...Array(3)].map((_, i) => {
          return <PremiumCard key={i} active={selection == i} onPress={() => setSelection(i)} />;
        })}
      </View>
      <View style={{flexDirection: 'column', gap: responsiveWidth(8)}}>
        <Text>Test1</Text>
        <Text>Test2</Text>
        <Text>Test3</Text>
      </View>
    </MainLayout>
  );
}

type SProps = {
  theme: MD3Theme;
  active?: boolean;
};

const makeStyles = ({theme, active}: SProps) =>
  StyleSheet.create({
    shadow: {
      shadowColor: active ? theme.colors.primary : 'rgb(138,138,138)',
      shadowOffset: {
        width: 0,
        height: active ? 4 : 3,
      },
      shadowOpacity: active ? 0.4 : 0.2,
      shadowRadius: 3,
      elevation: 0,
    },
  });
