import {useTheme} from '../../hooks';
import {ReactNode} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {useStores} from '../../stores';
import {observer} from 'mobx-react';
import YedyText from './YedyText';

type Props = {
  activeIndex?: number;
  onChangeIndex?: (index: number) => void;
  tabs: {
    label?: string;
    children?: ReactNode;
  }[];
};

export default observer(({tabs, activeIndex, onChangeIndex}: Props) => {
  const {colors} = useTheme();
  const {ui} = useStores();

  return (
    <View style={{flex: 1, flexDirection: 'column', width: ui.windowWidth}}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          gap: responsiveWidth(8),
          paddingHorizontal: responsiveWidth(16),
          paddingTop: responsiveWidth(16),
          paddingBottom: responsiveWidth(8),
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
              <YedyText color={i === activeIndex ? colors.background : colors.secondary}>{tab.label}</YedyText>
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
