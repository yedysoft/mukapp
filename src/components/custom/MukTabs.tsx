import {useTheme} from 'react-native-paper';
import MainLayout from '../../components/layouts/MainLayout';
import {Tabs, TabScreen, TabsProvider} from "react-native-paper-tabs";
import {ReactNode} from "react";

type Props = {
  tabs: {
    icon?: string
    label?: string
    children?: ReactNode
  }[]
}

export default function MukTabs({tabs}: Props) {
  const theme = useTheme();

  return (
    <MainLayout>
      <TabsProvider defaultIndex={0}>
        <Tabs showTextLabel={false} theme={theme}>
          {tabs.map((tab, i) => {
            return(
              <TabScreen icon={tab.icon ? tab.icon : 'blank'} label={tab.label ? tab.label : i.toString()}>
                {tab.children}
              </TabScreen>
            )
          })}
        </Tabs>
      </TabsProvider>
    </MainLayout>
  );
}
