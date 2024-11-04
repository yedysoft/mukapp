import {ScrollView} from 'react-native';
import {YedyModal, YedyText} from '../custom';
import {ModalScreenProps} from '../../types';
import {responsiveWidth} from '../../utils/util';
import React from 'react';
import {observer} from 'mobx-react';
import {useServices} from '../../services';
import {useStores} from '../../stores';

const PrivacyModal = observer(({visible, changeVisible}: ModalScreenProps) => {
  const {t} = useServices();
  const {ui} = useStores();

  return (
    <YedyModal visible={visible} changeVisible={changeVisible} style={{maxHeight: ui.windowHeight * 0.6}}>
      <ScrollView contentContainerStyle={{paddingHorizontal: responsiveWidth(12), paddingVertical: responsiveWidth(8)}}>
        <YedyText size={13}>{t.do('policy.privacy')}</YedyText>
      </ScrollView>
    </YedyModal>
  );
});

export default (props: ModalScreenProps) => <PrivacyModal {...props} />;
