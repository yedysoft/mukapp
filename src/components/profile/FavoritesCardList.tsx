import {responsiveHeight, responsiveSize, responsiveWidth} from '../../utils/Responsive';
import {Card, Text, useTheme} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import {IPlace} from '../../types/place';

type Props = {
  dataList: IPlace[];
  size?: number;
};
export default function FavoritesCardList({dataList, size = 180}: Props) {
  const {colors} = useTheme();

  return (
    <View style={{flexDirection: 'column', alignItems: 'flex-start', marginTop: responsiveWidth(10)}}>
      <Text style={{fontSize: responsiveSize(12), fontWeight: 'bold', color: colors.onSurfaceVariant}}>Favori Mekanlar</Text>
      <FlatList
        horizontal
        data={dataList}
        renderItem={({item, index}) => (
          <Card mode={'elevated'} style={{marginTop: 10, marginLeft: index !== 0 ? 10 : 0}}>
            <Card.Cover style={{height: responsiveHeight(size)}} source={{uri: item.image}} />
            <Card.Content style={{width: responsiveWidth(size)}}>
              <Text style={{paddingTop: responsiveHeight(10)}} variant="bodyMedium">
                {item.name}
              </Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}
