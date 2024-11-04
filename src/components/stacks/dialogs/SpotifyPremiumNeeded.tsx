import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {YedyDialog, YedyDialogScreenRef} from '../../custom';
import {useServices} from '../../../services';

export default forwardRef<YedyDialogScreenRef>((_props, ref) => {
  const {api, t} = useServices();
  const [visible, setVisible] = useState(false);

  const changeVisible = (open: boolean) => {
    setVisible(open);
  };

  const handleAccept = async () => {
    const url = 'https://www.spotify.com/premium';
    await api.helper.openURL(url);
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
        title: t.do('dialog.spotifyPremiumNeeded.title'),
        content: t.do('dialog.spotifyPremiumNeeded.content'),
        buttons: [
          {
            text: t.do('dialog.spotifyPremiumNeeded.accept'),
            onPress: handleAccept,
          },
        ],
      }}
    />
  );
});
