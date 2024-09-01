
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
        debugger
        self.position.lng = position.coords.longitude;
        self.position.lat = position.coords.latitude;
        createPoint.call(this, self.position)
    })


    //self.position.lng = 121.4808064;
    //self.position.lat = 25.0150912;
    //createPoint.call(this, self.position)
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
    //    var markerd = new google.maps.Marker({
    //        position: point,
    //        map: map,
    //        icon: yellowIcon // 設定自訂圖標
    //    });
    // 創建 InfoWindow 並設定內容為 "123"
    //    var infoWindow = new google.maps.InfoWindow({
    //        content: '<div>123</div><div>456</div>'
    //    });

    // 在標記上顯示 InfoWindow
    infoWindow.open(map, markerd);

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

                let currentPoint = haversineDistance(point, locPos);
                if (currentPoint <= 1) {

                    var marker = new google.maps.Marker({
                        position: locPos,
                        map: map
                    });

                    // 創建 InfoWindow 並設定內容為 "123"
                    var infoWindow = new google.maps.InfoWindow({
                        content: `<div style="font-size:9px"><div>藥局名稱:${response.data.features[i].properties.name}</div>
                      <div>成人口罩剩餘:${response.data.features[i].properties.mask_adult}個</div>
                      <div>孩子口罩剩餘:${response.data.features[i].properties.mask_child}個</div></div>`
                    });

                    // 在標記上顯示 InfoWindow
                    infoWindow.open(map, marker);


                }


            }

        })
        .catch(error => {
            debugger
            console.error('Error:', error); // 處理錯誤
        });

}

function haversineDistance(x, y) {
    const R = 6371; // 地球半徑（公里）
    const lat1 = coord1.lat * Math.PI / 180; // 將緯度從度轉換為弧度
    const lat2 = coord2.lat * Math.PI / 180; // 將緯度從度轉換為弧度
    const deltaLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const deltaLng = (coord2.lng - coord1.lng) * Math.PI / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // 距離（公里）
    return distance;
}

function haversineDistance(coords1, coords2) {
    const R = 6371; // 地球半徑，單位為公里
    const dLat = (coords2.lat - coords1.lat) * Math.PI / 180;
    const dLng = (coords2.lng - coords1.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(coords1.lat * Math.PI / 180) * Math.cos(coords2.lat * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance; // 距離單位為公里
}