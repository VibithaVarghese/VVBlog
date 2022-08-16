import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// This component renders the google map API
const Map = ({lat, lng}) => {

    // The script which loads the google map.
    // Read API key from the .env file.
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      })

    if(!isLoaded) return <div>Loading...</div>
    return (
        <div>
            {/* Google map API takes the following props
            1. zoom level
            2. center latitude and logitude.
            3. map continer class name to read the styles */}
            <GoogleMap zoom={16} center={{lat: lat, lng: lng}} mapContainerClassName="map-container">
                <Marker position={{lat: lat, lng: lng}}></Marker>
            </GoogleMap>
        </div>
    );
}

export default Map;