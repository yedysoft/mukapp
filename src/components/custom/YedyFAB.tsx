import {responsiveWidth, shadowStyle} from '../../utils/util';
import {observer} from 'mobx-react';
import YedyIconButton, {YedyIconButtonProps} from './YedyIconButton';
import {useTheme} from '../../hooks';
import {useServices} from '../../services';

type Props = YedyIconButtonProps & {
  shadow?: boolean;
};

export default observer(({scale = 0.5, shadow = true, ...rest}: Props) => {
  const {colors} = useTheme();
  const {api} = useServices();

  return (
    <YedyIconButton
      {...rest}
      scale={scale}
      color={rest.color ?? colors.dark}
      iconViewStyle={[
        {
          width: responsiveWidth(scale * 85),
          aspectRatio: 1,
          backgroundColor: api.helper.addOpacityToColor(colors.dark, 0.1),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
        },
        rest.iconViewStyle,
      ]}
      style={[
        {
          position: 'absolute',
          zIndex: 1400,
          backgroundColor: colors.primary,
          width: responsiveWidth(scale * 100),
          aspectRatio: 1,
        },
        shadow ? shadowStyle() : {},
        rest.style,
      ]}
    />
  );
});
