import {FlatList} from 'react-native';
import {responsiveWidth} from '../../utils/util';
import {ReactElement} from 'react';
import TasksListItem from './TasksListItem';

type Props = {
  tasks: any[];
  header?: ReactElement;
  onEndReached?: () => void;
  footer?: ReactElement;
};

export default function TasksList({tasks, header, onEndReached, footer}: Props) {
  return (
    <FlatList
      data={tasks}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      renderItem={({item, index}) => <TasksListItem key={index} />}
      scrollEnabled
      onEndReached={onEndReached}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingVertical: responsiveWidth(16), gap: responsiveWidth(16)}}
    />
  );
}
