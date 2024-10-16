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
import {genericMemo, responsiveWidth} from '../../../utils/util';
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
  itemHeight = 30,
  itemWidth = 'auto',
}: Props<T>) => {
  const {colors} = useTheme();
  const tempValue = value;
  const itemsIsArray = Array.isArray(items);
  const itemsArray = itemsIsArray ? items : Object.keys(items).map(k => k as T);
  value = checkValue<T>(tempValue, itemsArray);
  const visibleItemCount = 5;
  const scrollY = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList>(null);
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
            size={16}
            color={value === item ? colors.secondary : colors.outlineVariant}
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
    onValueChange && onValueChange(name, val, itemsIsArray ? undefined : items[val]);
  };

  const handleOnLayout = (event: LayoutChangeEvent) => {
    if (itemWidth === 'auto' && event.nativeEvent.layout.width && width !== event.nativeEvent.layout.width) {
      setWidth(event.nativeEvent.layout.width);
    }
  };

  useEffect(() => {
    if (tempValue && value && tempValue !== value) {
      gotoItem(value, true);
    }
  }, [tempValue, value]);

  useEffect(() => {
    onValueChange && tempValue && value && onValueChange(name, value, itemsIsArray ? undefined : items[value]);
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

const YedyPicker = genericMemo(PickerComp, (prevProps, nextProps) => services.api.helper.isEqual(prevProps, nextProps));
export default YedyPicker;
