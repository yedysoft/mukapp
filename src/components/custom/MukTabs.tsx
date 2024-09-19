import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {MukTheme} from '../../types';
import {Pressable, View} from 'react-native';
import MukIcon from './MukIcon';
import {responsiveWidth} from '../../utils/util';
import {useServices} from '../../services';
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
  const theme = useTheme<MukTheme>();
  const {api} = useServices();
  const {ui} = useStores();

  return (
    <View style={{flex: 1, flexDirection: 'column', width: ui.windowWidth}}>
      <View style={{flex: 1, flexDirection: 'row', width: '100%', maxHeight: responsiveWidth(60)}}>
        {tabs.map((tab, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => {
                onChangeIndex && onChangeIndex(i);
              }}
              style={{
                flex: 2,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: activeIndex === i ? theme.colors.primary : theme.colors.backdrop,
              }}
            >
              <MukIcon
                scale={activeIndex === i ? 0.8 : 0.7}
                color={activeIndex === i ? theme.colors.light : theme.colors.outlineVariant}
                icon={tab.icon ? tab.icon : 'blank'}
              />
            </Pressable>
          );
        })}
      </View>
      <View style={{flex: 1, flexDirection: 'column', width: '100%'}}>
        {activeIndex ? tabs[activeIndex].children : tabs[0].children}
      </View>
    </View>
  );
});
