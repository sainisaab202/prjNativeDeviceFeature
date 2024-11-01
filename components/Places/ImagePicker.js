import { launchCameraAsync, PermissionStatus, useCameraPermissions } from "expo-image-picker";
import { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({onTakeImage}){

    const [pickedImage, setPickedImage] = useState();

    //for ios
    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

    async function verifyPermission(){
        if(cameraPermissionInfo.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if(cameraPermissionInfo.status === PermissionStatus.DENIED){
            Alert.alert("Insufficient permissions!", "You need to grant camera permissions to use this app.")
            return false;
        }

        return true;
    }

    async function takeImageHandler() {

        const hasPermission = await verifyPermission();

        if(!hasPermission){
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        // console.log(image);
        // console.log(image.assets[0].uri);
        setPickedImage(image.assets[0].uri);

        //sending data to parent/component or screen
        onTakeImage(image.assets[0].uri);
    }

    let imagePreview = <Text>No image taken yet.</Text>;

    if(pickedImage){
        imagePreview = <Image style={styles.image} source={{uri: pickedImage}}/>
    }

    return <View>
        <View style={styles.imagePreview}>
            {imagePreview}
        </View>
        <OutlinedButton onPress={takeImageHandler} icon={"camera"}>Take Image</OutlinedButton>
    </View>
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        marginVertical:8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: "100%",
        height: "100%",
    }
});