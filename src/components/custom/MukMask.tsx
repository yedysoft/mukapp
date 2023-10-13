import {useTheme} from 'react-native-paper';
import {ReactNode} from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import {DimensionValue, View} from 'react-native';

type Props = {
  masked?: ReactNode;
  mask?: ReactNode;
  progress?: DimensionValue;
};

export default function MukMask({masked, mask, progress}: Props) {
  const {colors} = useTheme();

  return (
    <MaskedView
      maskElement={
        <View
          style={{
            backgroundColor: colors.tertiary,
            height: progress,
            width: '100%',
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
