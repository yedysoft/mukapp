import {DialogScreenProps} from '../../../types';
import React from 'react';
import YedyDialog from '../../custom/YedyDialog';
import {useServices} from '../../../services';

export default ({visible, changeVisible}: DialogScreenProps) => {
  const {api, t} = useServices();

  const handleAccept = async () => {
    const authUrl = 'https://www.spotify.com/premium';
    await api.helper.openURL(authUrl);
  };

  return (
    <YedyDialog
      visible={visible}
      changeVisible={changeVisible}
      dialog={{title: t.do('dialog.spotifyPremiumNeeded.title'), content: t.do('dialog.spotifyPremiumNeeded.content')}}
    />
  );
};
