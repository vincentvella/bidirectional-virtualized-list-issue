import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
} from 'react-native';

const sample = ['product', 'link', 'card'];

type Tile = { type: string };

const getRandomInt = (max: number) => Math.floor(Math.random() * max);
const listLength = () => Math.max(getRandomInt(20), 20);
const renderHorizontalListTile: ListRenderItem<Tile> = ({ item }) => (
  <Tile {...item} />
);
const renderVerticalList: ListRenderItem<Tile[]> = ({ item }) => (
  <List item={item} />
);

const Tile = React.memo(
  ({ type }: Tile) => {
    return (
      <View
        style={{ backgroundColor: 'yellow', width: 80, height: 80, margin: 8 }}>
        <Text>{type}</Text>
      </View>
    );
  },
  () => true,
);

const Separator = () => (
  <View
    style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'green' }}
  />
);

const List = React.memo(
  ({ item }: Pick<ListRenderItemInfo<Tile[]>, 'item'>) => {
    return (
      <View style={{ backgroundColor: 'blue', height: 96 }}>
        <FlatList<Tile>
          data={item}
          renderItem={renderHorizontalListTile}
          horizontal
          onViewableItemsChanged={console.log}
        />
      </View>
    );
  },
  () => true,
);

const data = Array.from({ length: listLength() }, () => {
  const type = sample[getRandomInt(2)];
  return Array.from({ length: Math.max(4, getRandomInt(10)) }, () => ({
    type,
  }));
}) as Tile[][];

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Change code in the editor and watch it change on your phone! Save to get
        a shareable url.
      </Text>
      <FlatList<Tile[]>
        ItemSeparatorComponent={Separator}
        data={data}
        renderItem={renderVerticalList}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
