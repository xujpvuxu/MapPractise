
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    methods: {
        located: located
    },
    mounted: function () {
        initMap.call(this);
        this.located()
    }
})
function initMap() {
    var uluru = { lat: 24.363, lng: 121.044 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

function located() {
    debugger
    navigator.geolocation.getCurrentPosition((position) => {
         console.log(position.coords);
        debugger
        console.log(position);
    })
}