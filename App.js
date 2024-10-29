import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { init } from "./util/database";
import { useCallback, useEffect, useState } from "react";

import * as SplashScreen from 'expo-splash-screen';
import PlaceDetails from "./screens/PlaceDetails";

const Stack = createNativeStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(()=>{
    init().then(()=>{
      // console.log("init finished --app.js")
      setAppIsReady(true);
    })
    .catch((err)=>{
      console.log(err);
    });
  }, []);

  if(!appIsReady){
    SplashScreen.hideAsync();
    return;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{backgroundColor: Colors.primary500},
          headerTintColor: Colors.gray700,
          contentStyle: {backgroundColor: Colors.gray700}
        }}>
          {/* we can access the navigation object by getting it from the function that is being passed to the options */}
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon={"add"}
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
              title: "Your Favorite Places"
            })}
          />
          <Stack.Screen name="AddPlace" component={AddPlace} options={{
            title: "Add a new Place"
          }}/>
          <Stack.Screen name="Map" component={Map}/>
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
            title: "Loading Place..."
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
