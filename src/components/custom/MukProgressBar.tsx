import {ProgressBar} from "react-native-paper";
import {responsiveHeight} from "../../utils/Responsive";

type Props = {
  progress?: number
}

export default function MukProgressBar({progress}: Props) {
  return (
    <ProgressBar progress={progress} color={'white'} style={{height: responsiveHeight(4), borderRadius: 100, width: '100%'}} />
  );
}
