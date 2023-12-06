import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import {MukTheme} from '../../types';
import {Pressable, View} from 'react-native';
import MukIcon from './MukIcon';
import {responsiveWidth, screenWidth} from '../../utils/util';
import {useServices} from '../../services';

type Props = {
  activeIndex?: number;
  onChangeIndex?: (index: number) => void;
  tabs: {
    icon?: string;
    label?: string;
    children?: ReactNode;
  }[];
};

export default function MukTabs({tabs, activeIndex, onChangeIndex}: Props) {
  const theme = useTheme<MukTheme>();
  const {api} = useServices();

  return (
    <View style={{flex: 1, flexDirection: 'column', width: screenWidth}}>
      <View style={{flex: 1, flexDirection: 'row', width: '100%', maxHeight: responsiveWidth(60)}}>
        {tabs.map((tab, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => onChangeIndex && onChangeIndex(i)}
              style={{
                flex: 2,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: activeIndex === i ? 1 : 0,
                borderBottomColor: api.helper.hexToRgba(theme.colors.primary, 0.1),
              }}
            >
              <MukIcon
                scale={0.7}
                color={activeIndex === i ? theme.colors.primary : theme.colors.outlineVariant}
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
}
