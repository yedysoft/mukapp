import {ReactNode} from 'react';
import {View} from 'react-native';
import {responsiveWidth} from '../../utils/Responsive';

export const NavButton = ({children}: {children: ReactNode}) => {
  return <View style={{width: responsiveWidth(44), aspectRatio: 1, justifyContent: 'center', alignItems: 'center'}}>{children}</View>;
};
