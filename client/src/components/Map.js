import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Map = ({lat, lng}) => {

    const { isLoaded } = useLoadScript({googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,});

    if(!isLoaded) return <div>Loading...</div>
    return (
        <div>
            <GoogleMap zoom={10} center={{lat: lat, lng: lng}} mapContainerClassName="map-container">
                <Marker position={{lat: lat, lng: lng}}></Marker>
            </GoogleMap>
        </div>
    );
}

export default Map;