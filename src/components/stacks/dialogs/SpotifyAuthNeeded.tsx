import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {YedyDialog} from '../../custom';
import {useServices} from '../../../services';
import {YedyPopupScreenRef} from '../../../types';

export default forwardRef<YedyPopupScreenRef>((_props, ref) => {
  const {api, t} = useServices();
  const [visible, setVisible] = useState(false);

  const changeVisible = (open: boolean) => {
    setVisible(open);
  };

  const handleAccept = async () => {
    await api.auths.connectAccount('SPOTIFY', 'Spotify');
    changeVisible(false);
  };

  useImperativeHandle(ref, () => ({
    open: () => changeVisible(true),
    close: () => changeVisible(false),
  }));

  return (
    <YedyDialog
      visible={visible}
      changeVisible={changeVisible}
      dialog={{
        title: t.do('dialog.spotifyAuthNeeded.title'),
        content: t.do('dialog.spotifyAuthNeeded.content'),
        buttons: [
          {
            text: t.do('dialog.spotifyAuthNeeded.accept'),
            onPress: handleAccept,
          },
        ],
      }}
    />
  );
});
