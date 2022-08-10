import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Map = () => {

    const { isLoaded } = useLoadScript({googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,});

    if(!isLoaded) return <div>Loading...</div>
    return (
        <div>
            <GoogleMap zoom={10} center={{lat: 44, lng: -80}} mapContainerClassName="map-container">
                <Marker position={{lat: 44, lng: -80}}></Marker>
            </GoogleMap>
        </div>
    );
}

export default Map;