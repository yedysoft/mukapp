import {ReactNode} from 'react';
import {YedyIconName} from '../../types';
import {Pressable, View} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';
import {useTheme} from '../../hooks';
import YedyIcon from './YedyIcon';

type Props = {
  activeIndex?: number;
  onChangeIndex?: (index: number) => void;
  tabs: {
    icon?: YedyIconName;
    label?: string;
    children?: ReactNode;
  }[];
};

export default observer(({tabs, activeIndex, onChangeIndex}: Props) => {
  const {colors} = useTheme();

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
              <YedyIcon
                scale={activeIndex === i ? 0.54 : 0.5}
                color={activeIndex === i ? colors.dark : colors.outlineVariant}
                icon={tab.icon ?? 'blank'}
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
