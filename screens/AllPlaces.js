import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function AllPlaces({route}){

    const [loadedPlaces, setLoadedPlaces] = useState([]);

    const isFocused = useIsFocused();
    useEffect(()=>{

        async function loadPlaces(){
            const res = await fetchPlaces();
            // console.log(res);
            setLoadedPlaces(res);
        }

        if(isFocused){
            loadPlaces()
            // setLoadedPlaces(
            //     prevPlaces => [...prevPlaces, route.params.place]
            // );

        }
    },[isFocused])
    // },[isFocused, route])

    return (
        <PlacesList places={loadedPlaces}/>
    )
}

export default AllPlaces;