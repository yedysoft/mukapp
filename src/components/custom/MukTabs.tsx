import {useTheme} from 'react-native-paper';
import {MainLayout} from '../../components/layouts/MainLayout';
import {Tabs, TabScreen, TabsProvider} from 'react-native-paper-tabs';
import {ReactNode} from 'react';

type Props = {
  defaultIndex?: number;
  tabs: {
    icon?: string;
    label?: string;
    children?: ReactNode;
  }[];
};

export default function MukTabs({tabs, defaultIndex}: Props) {
  const theme = useTheme();

  return (
    <TabsProvider defaultIndex={defaultIndex ? defaultIndex : 0}>
      <Tabs iconPosition={'top'} showTextLabel={false} theme={theme} style={{backgroundColor: theme.colors.background}}>
        {tabs.map((tab, i) => {
          return (
            <TabScreen key={i} icon={tab.icon ? tab.icon : 'blank'} label={tab.label ? tab.label : i.toString()}>
              {tab.children}
            </TabScreen>
          );
        })}
      </Tabs>
    </TabsProvider>
  );
}
