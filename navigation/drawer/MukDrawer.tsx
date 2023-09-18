import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import MukDrawerHeader from '../../components/drawer/MukDrawerHeader';
import MukDrawerContent from '../../components/drawer/MukDrawerContent';
import MukDrawerFooter from '../../components/drawer/MukDrawerFooter';

export default function MukDrawer() {
  const theme = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
      <MukDrawerHeader/>
      <MukDrawerContent/>
      <MukDrawerFooter/>
    </View>
  );
}
