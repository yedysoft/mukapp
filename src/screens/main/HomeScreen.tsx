import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import HomeTabs from '../../components/home/HomeTabs';
import CreateRoom from '../../components/home/CreateRoom';
import {useTabIndex} from 'react-native-paper-tabs';
import {useState} from 'react';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <MainLayout>
      <HomeTabs tabIndex={useTabIndex()}/>
      <CreateRoom/>
    </MainLayout>
  );
}
