import { GoogleMap, useLoadScript, Marker, useJsApiLoader } from "@react-google-maps/api";


const Map = ({lat, lng}) => {

    
    console.log("this is from map file", process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
    // const { isLoaded } = useLoadScript({googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,});
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      })

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