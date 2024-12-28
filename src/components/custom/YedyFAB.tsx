import {responsiveWidth, shadowStyle} from '../../utils/util';
import {observer} from 'mobx-react';
import YedyIconButton, {YedyIconButtonProps} from './YedyIconButton';
import {useTheme} from '../../hooks';

type Props = YedyIconButtonProps & {
  shadow?: boolean;
};

export default observer(({scale = 0.5, shadow = true, ...rest}: Props) => {
  const {colors} = useTheme();

  return (
    <YedyIconButton
      {...rest}
      scale={scale}
      color={rest.color ?? colors.dark}
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
