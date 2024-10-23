import {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {observer} from 'mobx-react';
import {YedyText} from '../custom';

type Props = {
  title?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default observer(({title, children, style}: Props) => {
  return (
    <View
      style={[
        {
          flexDirection: 'column',
          gap: responsiveWidth(4),
        },
        style,
      ]}
    >
      <YedyText type={'bold'} size={21} style={{paddingLeft: responsiveWidth(20)}}>
        {title}
      </YedyText>
      {children}
    </View>
  );
});
