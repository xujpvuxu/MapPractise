
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        position: {
            lng: 0,
            lat: 0
        }
    },
    methods: {
    },
    mounted: function () {
        initMap.call(this);
    }
})
function initMap() {
    let self = this;
    navigator.geolocation.getCurrentPosition((position) => {

        self.position.lng = position.longitude;
        self.position.lat = position.latitude;

        debugger;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: self.position
    });
    var marker = new google.maps.Marker({
        position: self.position,
        map: map
    });
        console.log(position);
    })
}
