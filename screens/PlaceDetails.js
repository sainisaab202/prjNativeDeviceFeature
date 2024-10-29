import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetechPlaceDetails } from "../util/database";

function PlaceDetails({route, navigation}){
    const [selectedPlace, setSelectedPlace] = useState();

    const selectedPlaceId = route.params.placeId;

    useEffect(()=>{
        // use selectedPlaceId to fetech data for a single place
        async function loadPlaceData(){
            place = await fetechPlaceDetails(selectedPlaceId)
            // console.log(place)
            setSelectedPlace(place);

            navigation.setOptions({
                title: place.title
            });
        }

        loadPlaceData();
    }, [selectedPlaceId]);

    function showMapHandler(){
        navigation.navigate("Map", {
            initialLat: selectedPlace.lat,
            initialLng: selectedPlace.lng
        });
    }

    if(!selectedPlace){
        return <View>
            <Text>Loading place data...</Text>
        </View>
    }

    return <ScrollView>
        <Image style={styles.image} source={{uri: selectedPlace.imageUri}}/>
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{selectedPlace.address}</Text>
            </View>
            <OutlinedButton icon={"map"} onPress={showMapHandler}>View on Map</OutlinedButton>
        </View>
    </ScrollView>
}

export default PlaceDetails;

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: "35%",
        minHeight: 300,
        width: "100%"
    },
    locationContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.primary500,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    }
});