import React, {useCallback, useMemo, useRef, useState} from 'react';
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
import {responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {useTheme} from 'react-native-paper';
import {MukColors, MukTheme} from '../../types';

type Props<T> = {
  name: string;
  items: T[];
  value?: T;
  itemHeight?: number;
  onValueChange?: (name: string, value: T) => void;
};

export default function MukPicker<T>({name, items, value, onValueChange, itemHeight = 30}: Props<T>) {
  console.log('MukPickerRender', name, value);
  if (value && !items.includes(value)) {
    value = undefined;
  }
  const visibleItemCount = 5;
  const scrollY = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList>(null);
  const {colors} = useTheme<MukTheme>();
  const [selectedValue, setSelectedValue] = useState(value ?? items[0]);
  const emptyItems = useMemo(() => Array((visibleItemCount - 1) / 2).fill(''), [visibleItemCount]);
  const modifiedItems = useMemo(() => [...emptyItems, ...items, ...emptyItems], [items, emptyItems]);
  const styles = useMemo(
    () => pickerStyles(itemHeight, visibleItemCount, colors),
    [itemHeight, visibleItemCount, colors],
  );

  const renderItem = useMemo(
    () =>
      ({item, index}: ListRenderItemInfo<T>) => {
        const inputRange = [
          (index - 4) * itemHeight,
          (index - 3) * itemHeight,
          (index - 2) * itemHeight,
          (index - 1) * itemHeight,
          index * itemHeight,
        ];
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [0.8, 0.9, 1.1, 0.9, 0.8],
        });
        const rotateX = scrollY.interpolate({
          inputRange,
          outputRange: ['-40deg', '-20deg', '0deg', '20deg', '40deg'],
        });
        return (
          <Pressable onPress={() => gotoItem(item, true)}>
            <Animated.View
              style={{
                height: itemHeight,
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{scale}, {rotateX}],
              }}
            >
              <Text
                style={{
                  fontSize: responsiveSize(16),
                  fontWeight: '600',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: selectedValue === item ? colors.secondary : colors.outlineVariant,
                }}
              >
                {String(item)}
              </Text>
            </Animated.View>
          </Pressable>
        );
      },
    [selectedValue, itemHeight, scrollY],
  );

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    const val = items[index];
    if (val !== selectedValue) {
      gotoItem(val, false);
    }
  };

  const gotoItem = useCallback(
    (value: T, scroll: boolean) => {
      if (value) {
        console.log('MukPicker', name, value);
        onValueChange && onValueChange(name, value);
        setSelectedValue(value);
        if (listRef.current && scroll) {
          const index = modifiedItems.indexOf(value);
          const initialScrollIndex = index - (visibleItemCount - 1) / 2;
          listRef.current.scrollToIndex({index: initialScrollIndex, animated: true});
        }
      }
    },
    [modifiedItems, visibleItemCount, listRef],
  );

  return (
    <View style={{height: itemHeight * visibleItemCount}}>
      <Animated.FlatList
        style={{height: itemHeight * visibleItemCount, width: responsiveWidth(80)}}
        ref={listRef}
        initialScrollIndex={modifiedItems.indexOf(value) - (visibleItemCount - 1) / 2}
        data={modifiedItems}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        initialNumToRender={visibleItemCount * 2}
        onMomentumScrollEnd={onScrollEnd}
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
        getItemLayout={(_, index) => ({length: itemHeight, offset: itemHeight * index, index})}
      />
      <View style={styles.indicator} />
      <View
        style={[
          {
            marginTop: itemHeight,
          },
          styles.indicator,
        ]}
      />
    </View>
  );
}

const pickerStyles = (itemHeight: number, visibleItemCount: number, colors: MukColors) =>
  StyleSheet.create({
    indicator: {
      position: 'absolute',
      top: itemHeight * ((visibleItemCount - 1) / 2),
      width: responsiveWidth(80),
      height: responsiveWidth(0.5),
      backgroundColor: colors.outlineVariant,
    },
  });
