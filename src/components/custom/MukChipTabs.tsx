import {Text, useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {MukTheme} from '../../types';
import {TouchableOpacity, View} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';

type Props = {
  activeIndex?: number;
  onChangeIndex?: (index: number) => void;
  tabs: {
    icon?: string;
    label?: string;
    children?: ReactNode;
  }[];
};

export default observer(({tabs, activeIndex, onChangeIndex}: Props) => {
  const {colors} = useTheme<MukTheme>();
  const {ui} = useStores();

  return (
    <View style={{flex: 1, flexDirection: 'column', width: ui.windowWidth, gap: responsiveWidth(16)}}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          gap: responsiveWidth(8),
          paddingHorizontal: responsiveWidth(16),
        }}
      >
        {tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                onChangeIndex && onChangeIndex(i);
              }}
              style={{
                paddingVertical: responsiveWidth(12),
                paddingHorizontal: responsiveWidth(16),
                backgroundColor: i === activeIndex ? colors.primary : colors.shadow,
                borderRadius: 32,
              }}
            >
              <Text style={{color: i === activeIndex ? colors.background : colors.secondary}}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{flex: 1, flexDirection: 'column', width: '100%'}}>
        {activeIndex ? tabs[activeIndex].children : tabs[0].children}
      </View>
    </View>
  );
});
