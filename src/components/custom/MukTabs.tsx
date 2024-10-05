import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {MukTheme} from '../../types';
import {Pressable, View} from 'react-native';
import MukIcon from './MukIcon';
import {responsiveWidth} from '../../utils/util';
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

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'row', maxHeight: responsiveWidth(60)}}>
        {tabs.map((tab, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => {
                onChangeIndex && onChangeIndex(i);
              }}
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: activeIndex === i ? colors.primary : colors.backdrop,
              }}
            >
              <MukIcon
                scale={activeIndex === i ? 0.8 : 0.7}
                color={activeIndex === i ? colors.dark : colors.outlineVariant}
                icon={tab.icon ? tab.icon : 'blank'}
              />
            </Pressable>
          );
        })}
      </View>
      <View style={{flex: 1, flexDirection: 'column'}}>
        {activeIndex ? tabs[activeIndex].children : tabs[0].children}
      </View>
    </View>
  );
});
