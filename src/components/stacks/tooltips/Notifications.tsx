import NotificationList from '../../notification/NotificationList';
import {YedyTooltip} from '../../custom';
import {Positions, YedyPopupScreenRef} from '../../../types';
import {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {useServices} from '../../../services';
import {useStores} from '../../../stores';
import {observer} from 'mobx-react';

export default observer(
  forwardRef<YedyPopupScreenRef>((_props, ref) => {
    const {api} = useServices();
    const {ui} = useStores();
    const [visible, setVisible] = useState(false);
    const [positions, setPositions] = useState<Positions>();

    const changeVisible = (open: boolean) => {
      setVisible(open);
    };

    useImperativeHandle(ref, () => ({
      open: () => changeVisible(true),
      close: () => changeVisible(false),
      sendPositions: positions => setPositions(positions),
      isVisible: visible,
    }));

    useEffect(() => {
      visible && api.user.updateReaded();
    }, [visible]);

    return (
      <YedyTooltip
        anchor={'bottom-left'}
        positions={positions}
        visible={visible}
        changeVisible={changeVisible}
        style={{width: ui.windowWidth * 0.5, height: ui.windowHeight * 0.3}}
      >
        <NotificationList compact />
      </YedyTooltip>
    );
  }),
);
