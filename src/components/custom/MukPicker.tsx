import React, {useEffect, useMemo, useRef} from 'react';
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
import {genericMemo, responsiveSize, responsiveWidth} from '../../utils/util';
import {useTheme} from 'react-native-paper';
import {MukColors, MukTheme} from '../../types';

type Props<T> = {
  name: string;
  items: T[];
  value?: T;
  itemHeight?: number;
  onValueChange?: (name: string, value: T) => void;
};

const checkValue = <T,>(value: T | undefined, items: T[]): T => {
  if (!value) {
    return items[0];
  }
  if (!items.includes(value)) {
    return items[items.length - 1];
  }
  return value;
};

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

const MukPickerComp = <T,>({name, items, value, onValueChange, itemHeight = 30}: Props<T>) => {
  const tempValue = value;
  value = checkValue<T>(tempValue, items);
  console.log('MukPickerCompRender', name, tempValue, value);
  const visibleItemCount = 5;
  const scrollY = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList>(null);
  const {colors} = useTheme<MukTheme>();
  const emptyItems = useMemo(() => Array((visibleItemCount - 1) / 2).fill(''), [visibleItemCount]);
  const modifiedItems = useMemo(() => [...emptyItems, ...items, ...emptyItems], [items, emptyItems]);
  const styles = useMemo(
    () => pickerStyles(itemHeight, visibleItemCount, colors),
    [itemHeight, visibleItemCount, colors],
  );

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
              color: value === item ? colors.secondary : colors.outlineVariant,
            }}
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
    const val = items[index];
    if (val !== value) {
      gotoItem(val, false);
    }
  };

  const gotoItem = (val: T, scroll: boolean) => {
    if (val) {
      value = val;
      if (listRef.current && scroll) {
        const index = modifiedItems.indexOf(val);
        const initialScrollIndex = index - (visibleItemCount - 1) / 2;
        listRef.current.scrollToIndex({index: initialScrollIndex, animated: true});
      }
    }
    onValueChange && onValueChange(name, val);
  };

  useEffect(() => {
    if (tempValue !== value && value) {
      gotoItem(value, true);
    }
  }, [tempValue, value]);

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
};

const MukPicker = genericMemo(MukPickerComp);
export default MukPicker;
