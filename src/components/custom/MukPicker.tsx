import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
} from 'react-native';

type Props<T> = {
  name: string;
  items: T[];
  defaultValue?: T;
  itemHeight?: number;
  onValueChange?: (name: string, value: T) => void;
};

export default function MukPicker<T>({name, items, defaultValue, onValueChange, itemHeight = 30}: Props<T>) {
  if (defaultValue && !items.includes(defaultValue)) {
    defaultValue = undefined;
  }
  const visibleItemCount = 5;
  const scrollY = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList>(null);

  const [selectedValue, setSelectedValue] = useState(defaultValue ?? items[0]);
  const emptyItems = useMemo(() => Array((visibleItemCount - 1) / 2).fill(''), [visibleItemCount]);
  const modifiedItems = useMemo(() => [...emptyItems, ...items, ...emptyItems], [items, emptyItems]);

  const renderItem = ({item, index}: ListRenderItemInfo<T>) => {
    const inputRange = [
      (index - 4) * itemHeight,
      (index - 3) * itemHeight,
      (index - 2) * itemHeight,
      (index - 1) * itemHeight,
      index * itemHeight,
    ];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.7, 0.9, 1.1, 0.9, 0.7],
    });
    const rotateX = scrollY.interpolate({
      inputRange,
      outputRange: ['-55deg', '-50deg', '0deg', '50deg', '55deg'],
    });
    return (
      <Pressable onPress={() => gotoItem(item)}>
        <Animated.View
          style={{height: itemHeight, justifyContent: 'center', alignItems: 'center', transform: [{scale}, {rotateX}]}}
        >
          <Text
            style={{fontSize: 18, fontWeight: '600', textAlign: 'center', textAlignVertical: 'center', color: '#000'}}
          >
            {String(item)}
          </Text>
        </Animated.View>
      </Pressable>
    );
  };

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    const value = items[index];
    if (value !== selectedValue) {
      setSelectedValue(value);
      onValueChange && onValueChange(name, value);
    }
  };

  const gotoItem = (value: T | undefined) => {
    if (listRef.current && value) {
      const index = modifiedItems.indexOf(value);
      const initialScrollIndex = index - (visibleItemCount - 1) / 2;
      listRef.current.scrollToIndex({index: initialScrollIndex, animated: true});
      if (value !== selectedValue) {
        setSelectedValue(value);
        onValueChange && onValueChange(name, value);
      }
    }
  };

  useEffect(() => {
    gotoItem(defaultValue);
  }, [listRef, defaultValue]);

  return (
    <View style={{backgroundColor: 'red'}}>
      <Animated.FlatList
        style={{backgroundColor: 'green', height: itemHeight * visibleItemCount}}
        ref={listRef}
        data={modifiedItems}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        onMomentumScrollEnd={onScrollEnd}
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
        getItemLayout={(_, index) => ({length: itemHeight, offset: itemHeight * index, index})}
      />
      <View
        style={{
          borderColor: 'red',
          borderBottomWidth: 1,
          borderTopWidth: 1,
          position: 'absolute',
          height: itemHeight,
          right: 0,
          left: 0,
          top: itemHeight * ((visibleItemCount - 1) / 2),
        }}
      />
    </View>
  );
}
