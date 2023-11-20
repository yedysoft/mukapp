import React, {useMemo, useRef, useState} from 'react';
import {Animated, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View} from 'react-native';

type Props = {
  items: string[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  itemHeight?: number;
};

export default function MukPicker({items, defaultValue, onValueChange, itemHeight = 30}: Props) {
  const visibleItemCount = 5;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [scrollPosition, setScrollPosition] = useState(0);
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
      outputRange: [0.4, 0.8, 1.2, 0.8, 0.4],
    });

    const fontWeight = (() => {
      const translateY = scrollPosition - index * itemHeight;
      const maxTranslateY = itemHeight * 1.5; // You can adjust this value
      const normalizedTranslateY = Math.min(Math.abs(translateY), maxTranslateY);
      const normalizedWeight = 400 + (normalizedTranslateY / maxTranslateY) * 200;
      console.log(normalizedWeight);
      return normalizedWeight.toFixed(0);
    })();
    return (
      <Animated.View style={[{height: itemHeight, transform: [{scale}]}, styles.animatedContainer]}>
        <Animated.Text style={[styles.pickerItem, {fontWeight}]}>{item}</Animated.Text>
      </Animated.View>
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

  return (
    <View style={{height: itemHeight * visibleItemCount}}>
      <Animated.FlatList
        data={modifiedItems}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        onMomentumScrollEnd={onScrollEnd}
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
          useNativeDriver: true,
          listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const y = event.nativeEvent.contentOffset.y;
            setScrollPosition(y);
          },
        })}
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
