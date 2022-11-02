import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  SafeAreaView,
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
          // Below line surfaces issue
          onViewableItemsChanged={console.log}
          // You will notice that as soon as the list is mounted, every nested list rendered by this component fires it's viewable items changed callback
          // This is because virtualized list is not taking vertical viewability into account
          // Technically you should only see the nested callbacks fire once they enter the viewport bidirectionally (vertically and horizontally)
        />
      </View>
    );
  },
  () => true,
);

const data = Array.from({ length: listLength() }, () => {
  const type = sample[getRandomInt(2)];
  return Array.from({ length: Math.max(6, getRandomInt(10)) }, () => ({
    type,
  }));
}) as Tile[][];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        Change code in the editor and watch it change on your phone! Save to get
        a shareable url.
      </Text>
      <FlatList<Tile[]>
        ItemSeparatorComponent={Separator}
        data={data}
        renderItem={renderVerticalList}
        // Uncomment to see vertical viewability changes of horizontal lists (works as expected)
        // onViewableItemsChanged={console.log}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
