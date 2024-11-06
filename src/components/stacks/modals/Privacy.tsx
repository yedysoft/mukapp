import {ScrollView} from 'react-native';
import {YedyModal, YedyText} from '../../custom';
import {responsiveWidth} from '../../../utils/util';
import {forwardRef, useImperativeHandle, useState} from 'react';
import {useServices} from '../../../services';
import {YedyPopupScreenRef} from '../../../types';

export default forwardRef<YedyPopupScreenRef>((_props, ref) => {
  const {t} = useServices();
  const [visible, setVisible] = useState(false);

  const changeVisible = (open: boolean) => {
    setVisible(open);
  };

  useImperativeHandle(ref, () => ({
    open: () => changeVisible(true),
    close: () => changeVisible(false),
  }));

  return (
    <YedyModal visible={visible} changeVisible={changeVisible} title={t.do('policy.title')} fullscreen={true}>
      <ScrollView contentContainerStyle={{paddingVertical: responsiveWidth(8)}}>
        <YedyText size={13}>{t.do('policy.privacy')}</YedyText>
      </ScrollView>
    </YedyModal>
  );
});
