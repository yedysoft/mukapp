import {ScrollView, View} from 'react-native';
import {YedyModal, YedyText} from '../custom';
import {ModalScreenProps} from '../../types';
import {responsiveWidth} from '../../utils/util';
import React from 'react';
import {observer} from 'mobx-react';
import {useTheme} from '../../hooks';
import {useServices} from "../../services";

const PrivacyModal = observer(({visible, changeVisible}: ModalScreenProps) => {
  const {colors} = useTheme();
  const {t} = useServices();

  return (
    <YedyModal visible={visible} changeVisible={changeVisible}>
      <ScrollView contentContainerStyle={{paddingHorizontal: responsiveWidth(12), paddingVertical: responsiveWidth(8)}}>
        <YedyText>
          {t.do('policy.privacy')}
        </YedyText>
      </ScrollView>
    </YedyModal>
  );
});

export default (props: ModalScreenProps) => <PrivacyModal {...props} />;
