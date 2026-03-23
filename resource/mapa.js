$(function(){

    navigator.geolocation.getCurrentPosition(

        (position) => {

            const latitude = position.coords.latitude;

            const longitude = position.coords.longitude;

            

            var map = L.map('map').setView([latitude, longitude], 25);
    
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            var marker = L.marker([latitude, longitude]).addTo(map);

            marker.bindPopup(
                "<h4>Estas aquí</h4>"
            ).openPopup();

        },

        (error) => {

            console.log("Error al obtener la ubicación:", error);
        },

        {

            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge:0
        }



    );
});