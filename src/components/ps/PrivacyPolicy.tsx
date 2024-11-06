import {useTheme} from '../../hooks';
import {YedyText} from '../custom';
import {useServices} from '../../services';
import {StyleProp, TextStyle} from 'react-native';
import {MukLangPaths} from '../../types';
import {useStores} from '../../stores';

type Props = {
  name: string;
  style?: StyleProp<TextStyle>;
};

export default ({name, style}: Props) => {
  const {colors} = useTheme();
  const {ui} = useStores();
  const {t} = useServices();

  return (
    <>
      <YedyText type={'bold'} color={colors.outlineVariant} style={style}>
        {t.do(`${name}.privacyPolicyStart` as MukLangPaths)}
        <YedyText type={'bold'} color={colors.primary} onPress={() => ui.openPopup('privacy')}>
          {t.do(`${name}.privacyPolicy` as MukLangPaths)}
        </YedyText>
        {t.do(`${name}.privacyPolicyEnd` as MukLangPaths)}
      </YedyText>
    </>
  );
};
