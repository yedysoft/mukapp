import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import {View} from 'react-native';

type Props = {
  masked?: ReactNode;
  mask?: ReactNode;
};

export default function MukMask({masked, mask}: Props) {
  const theme = useTheme();

  return (
    <MaskedView
      style={{flex: 1, flexDirection: 'row'}}
      maskElement={
        <View
          style={{
            backgroundColor: 'transparent',
          }}
        >
          {masked}
        </View>
      }
    >
      {mask}
    </MaskedView>
  );
}
