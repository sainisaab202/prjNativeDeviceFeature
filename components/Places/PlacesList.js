import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";
import { useNavigation } from "@react-navigation/native";

function PlacesList({ places }) {
  // return <View><Text>{places.length}</Text></View>

  const navigation = useNavigation();

  function selectPlaceHandler(id){
    navigation.navigate("PlaceDetails", {
      placeId: id
    });
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
        style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => 
         <PlaceItem place={item} onSelect={selectPlaceHandler}/>
      }
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
  list:{
    margin: 24
  }
});
