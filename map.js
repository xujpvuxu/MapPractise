
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
        self.position.lng = position.coords.longitude;
        self.position.lat = position.coords.latitude;
        createPoint.call(this, self.position)
    })


//    self.position.lng = 121.4808064;
//    self.position.lat = 25.0150912;
//    createPoint.call(this, self.position)
}

function createPoint(point) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: point,
    });


    var yellowIcon = {
        url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png", // 圖標的 URL
        scaledSize: new google.maps.Size(40, 40), // 調整圖標的大小
    };

    // 當前位置
    var marker = new google.maps.Marker({
        position: point,
        map: map,
        icon: yellowIcon // 設定自訂圖標
    });



    // 口罩API
    axios.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json', {
        headers: {
            'Content-Type': 'application/json'
            // 如果有需要額外的 headers，可以在這裡添加
        }
    })
        .then(response => {
            for (let i = 0; i < response.data.features.length; i++) {
                const pos = response.data.features[i].geometry.coordinates;
                let locPos = {
                    lng: pos[0],
                    lat: pos[1]

                }

                var marker = new google.maps.Marker({
                    position: locPos,
                    map: map
                });

            }
        })
        .catch(error => {
            debugger
            console.error('Error:', error); // 處理錯誤
        });

}

