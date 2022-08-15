import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";


const Map = ({lat, lng}) => {

    

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      })

    if(!isLoaded) return <div>Loading...</div>
    return (
        <div>
            <GoogleMap zoom={16} center={{lat: lat, lng: lng}} mapContainerClassName="map-container">
                <Marker position={{lat: lat, lng: lng}}></Marker>
            </GoogleMap>
        </div>
    );
}

export default Map;