import {Pressable} from 'react-native';
import {Text} from 'react-native-paper';

type Props = {
  text: string;
};

export default function MukButton({text}: Props) {
  return (
    <Pressable>
      <Text>DENEME</Text>
    </Pressable>
  );
}
