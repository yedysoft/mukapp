import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = {
  items: string[];
  defaultValue?: string;
  itemHeight?: number;
  onValueChange?: (value: string) => void;
};

export default function MukPicker({items, defaultValue, onValueChange, itemHeight = 30}: Props) {
  if (defaultValue && !items.includes(defaultValue)) {
    defaultValue = undefined;
  }
  const visibleItemCount = 5;
  const scrollY = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList>(null);

  const [selectedValue, setSelectedValue] = useState(defaultValue ?? items[0]);
  const emptyItems = useMemo(() => Array((visibleItemCount - 1) / 2).fill(''), [visibleItemCount]);
  const modifiedItems = useMemo(() => [...emptyItems, ...items, ...emptyItems], [items, emptyItems]);

  const renderItem = ({item, index}: ListRenderItemInfo<string>) => {
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
        <Animated.View style={[{height: itemHeight, transform: [{scale}, {rotateX}]}, styles.animatedContainer]}>
          <Text style={styles.pickerItem}>{item}</Text>
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
      if (onValueChange) {
        onValueChange(value);
      }
    }
  };

  const gotoItem = (value: string | undefined) => {
    if (listRef.current && value) {
      const index = modifiedItems.indexOf(value);
      const initialScrollIndex = index - (visibleItemCount - 1) / 2;
      listRef.current.scrollToIndex({index: initialScrollIndex, animated: true});
    }
  };

  useEffect(() => {
    gotoItem(defaultValue);
  }, [listRef, defaultValue]);

  return (
    <View style={{height: itemHeight * visibleItemCount}}>
      <Animated.FlatList
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
      <View style={[styles.indicatorHolder, {top: itemHeight * ((visibleItemCount - 1) / 2)}]}>
        <View style={[styles.indicator]} />
        <View style={[styles.indicator, {marginTop: itemHeight}]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000',
  },
  indicatorHolder: {
    position: 'absolute',
  },
  indicator: {
    width: 250,
    height: 2,
    backgroundColor: '#ccc',
  },
  animatedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
