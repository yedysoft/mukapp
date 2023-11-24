import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {ReactElement} from 'react';
import RoomSettingsListItem from './RoomSettingsListItem';

type Props = {
  settings: any[];
  header?: ReactElement;
  onEndReached?: () => void;
  footer?: ReactElement;
};

export default function RoomSettingsList({settings, header, onEndReached, footer}: Props) {
  return (
    <FlatList
      data={settings}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      renderItem={({item, index}) => <RoomSettingsListItem key={index} />}
      scrollEnabled
      onEndReached={onEndReached}
      contentContainerStyle={{paddingVertical: responsiveWidth(16)}}
    />
  );
}
