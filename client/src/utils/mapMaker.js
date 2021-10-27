
import Geocode from "react-geocode";

//const GEO_Addy = "814 East Main Street Richmond VA, 23219";
//const googleApi = "AIzaSyANVcwxmtqRv976LXeFAEq86ffTenupwDk"
//var geocoder;




export function mapLocation(mapAddy) {
    Geocode.setApiKey("AIzaSyANVcwxmtqRv976LXeFAEq86ffTenupwDk")
    Geocode.fromAddress(mapAddy).then(
        (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            initMap(lat, lng)
            console.log(lat, lng);
        },
        (error) => {
            console.error(error);
        }
    );
};

// Make Maps  ---------------------

export function initMap(lat, lng) {
    if(!document.getElementById("map1")) return;
  new window.google.maps.Map(document.getElementById("map1"), {
        center:
        {
            lat: lat,
            lng: lng
        },
        zoom: 8,
        mapId: "34951e58f2519ded"
    });
}







{/* <div id="map"></div>

<!-- Async script executes immediately and must be after any DOM elements used in callback. -->
<script
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&v=weekly"
  async
></script> */}