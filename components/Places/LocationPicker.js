import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";

import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";
import { getAddress, getMapPreview } from "../../util/location";
import { useEffect, useState } from "react";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";


function LocationPicker({onPickLocation}){
    const [pickedLocation, setPickedLocation] = useState();

    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();

    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    ////shorthand form of line (basically used in jsx)
    // const mapPickedLocation = route.params && {lat: route.params.pickedLat, lng: route.params.pickedLng};
    
    ////here we are using useIsFocused hook that help us if the current component's screen is main/top of our nav stack
    useEffect(()=>{
        if(isFocused && route.params){
            const mapPickedLocation = route.params ? {lat: route.params.pickedLat, lng: route.params.pickedLng} : null;
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    useEffect(()=>{
        async function handleLocation(){
            if(pickedLocation){
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
                onPickLocation({...pickedLocation, address: address});
            }
        }
        handleLocation();
    },[pickedLocation, onPickLocation]);

    async function verifyPermission(){

        if(locationPermissionInfo.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if(locationPermissionInfo.status === PermissionStatus.DENIED){
            Alert.alert("Insufficient permissions!", "You need to grant location permissions to use this app.")
            return false;
        }

        return true;
    }

    async function getLocationHandler(){
        const hasPermission = verifyPermission();

        if(!hasPermission){
            return;
        }

        const location = await getCurrentPositionAsync({});
        // console.log(location);
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    };

    function pickOnMapHandler(){
        navigation.navigate("Map");
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if (pickedLocation){
        locationPreview = <Image style={styles.image} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}}/>
    }

    return <View>
        <View style={styles.mapPreview}>
            {locationPreview}
        </View>
        <View style={styles.actions}>
            <OutlinedButton icon={"location"} onPress={getLocationHandler}>Locate User</OutlinedButton>
            <OutlinedButton icon={"map"} onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
        </View>
    </View>
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical:8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 4
    }
});