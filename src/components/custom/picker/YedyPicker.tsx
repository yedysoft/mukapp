import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  LayoutChangeEvent,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {genericMemo, responsiveHeight, responsiveWidth} from '../../../utils/util';
import {useTheme} from '../../../hooks';
import {services, useServices} from '../../../services';
import YedyText from '../YedyText';

type Props<T extends string | number> = {
  name: string;
  items: Record<T, string> | T[];
  value?: T;
  itemHeight?: number;
  itemWidth?: number | 'auto';
  onValueChange?: (name: string, value: T, prettyValue?: string) => void;
};

const checkValue = <T extends string | number>(value: T | undefined, items: T[]): T => {
  if (!value) {
    return items[0];
  }
  if (!items.includes(value)) {
    return items[items.length - 1];
  }
  return value;
};

const pickerStyles = (itemHeight: number, visibleItemCount: number, color: string, width: number) =>
  StyleSheet.create({
    indicator: {
      position: 'absolute',
      top: itemHeight * ((visibleItemCount - 1) / 2),
      width: width,
      height: responsiveWidth(1),
      backgroundColor: color,
    },
  });

const PickerComp = <T extends string | number>({
  name,
  items,
  value,
  onValueChange,
  itemHeight = responsiveHeight(30),
  itemWidth = 'auto',
}: Props<T>) => {
  const {colors} = useTheme();
  const itemsIsArray = Array.isArray(items);
  const itemsArray = useMemo(() => (Array.isArray(items) ? items : Object.keys(items).map(k => k as T)), [items]);
  const pickerValue = useRef<T>(checkValue<T>(value, itemsArray));
  const visibleItemCount = 5;
  const {current: scrollY} = useRef(new Animated.Value(0));
  const listRef = useRef<FlatList>(null);
  const [selected, setSelected] = useState<T>(pickerValue.current);
  const emptyItems = useMemo(() => Array((visibleItemCount - 1) / 2).fill(''), [visibleItemCount]);
  const modifiedItems = useMemo(() => [...emptyItems, ...itemsArray, ...emptyItems], [itemsArray, emptyItems]);
  const {api} = useServices();
  const [width, setWidth] = useState<number>(0);

  const styles = useMemo(
    () =>
      pickerStyles(
        itemHeight,
        visibleItemCount,
        api.helper.addOpacityToColor(colors.secondary, 0.1),
        itemWidth === 'auto' ? width : itemWidth,
      ),
    [itemHeight, visibleItemCount, colors, width, itemWidth],
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
      outputRange: [0.7, 0.8, 1.0, 0.8, 0.7],
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
          <YedyText
            numberOfLines={1}
            type={'bold'}
            size={15}
            color={selected === item ? colors.secondary : colors.outlineVariant}
            style={{textAlign: 'center', textAlignVertical: 'center'}}
          >
            {itemsIsArray ? String(item) : items[item]}
          </YedyText>
        </Animated.View>
      </Pressable>
    );
  };

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    const val = itemsArray[index];
    if (val !== pickerValue.current) {
      gotoItem(val, false);
    }
  };

  const gotoItem = (val: T | undefined, scroll: boolean, justGoItem = false) => {
    if (val) {
      pickerValue.current = val;
      setSelected(pickerValue.current);
      if (listRef.current && scroll) {
        const index = modifiedItems.indexOf(val);
        const initialScrollIndex = index - (visibleItemCount - 1) / 2;
        listRef.current.scrollToIndex({index: initialScrollIndex, animated: true});
      }
      onValueChange && !justGoItem && onValueChange(name, val, itemsIsArray ? undefined : items[val]);
    }
  };

  const handleOnLayout = (event: LayoutChangeEvent) => {
    if (itemWidth === 'auto' && event.nativeEvent.layout.width && width !== event.nativeEvent.layout.width) {
      setWidth(event.nativeEvent.layout.width);
    }
  };

  useEffect(() => {
    const newValue = checkValue<T>(value, itemsArray);
    if (pickerValue.current !== newValue) {
      gotoItem(newValue, true, !value || value === -1);
    }
  }, [value]);

  useEffect(() => {
    const newValue = checkValue<T>(value, itemsArray);
    gotoItem(newValue, false, !value || value === -1);
  }, []);

  return (
    <View
      style={{
        height: itemHeight * visibleItemCount,
        width: itemWidth === 'auto' ? undefined : itemWidth,
        paddingHorizontal: responsiveWidth(8),
      }}
      onLayout={handleOnLayout}
    >
      <Animated.FlatList
        style={{height: itemHeight * visibleItemCount}}
        ref={listRef}
        initialScrollIndex={modifiedItems.indexOf(pickerValue.current) - (visibleItemCount - 1) / 2}
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

const YedyPicker = genericMemo(PickerComp, (prevProps, nextProps) => services.api.helper.isEqual(prevProps, nextProps));
export default YedyPicker;
