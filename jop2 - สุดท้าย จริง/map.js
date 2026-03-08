let map;
let marker = null;
let selectedLat = null;
let selectedLng = null;
let selectedAddress = "";

// init map แบบ fallback (ไม่พังแม้ไม่ให้ location)
function initMap(lat = 16.8211, lng = 100.2659) {
    map = L.map("map").setView([lat, lng], 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
    }).addTo(map);

    map.on("click", e => {
        selectedLat = e.latlng.lat;
        selectedLng = e.latlng.lng;
        selectedAddress = `พิกัด ${selectedLat.toFixed(6)}, ${selectedLng.toFixed(6)}`;

        if (marker) {
            marker.setLatLng(e.latlng);
        } else {
            marker = L.marker(e.latlng).addTo(map);
        }
    });
}

// ขอพิกัดจริง ถ้าไม่ได้ก็ยังมี map ให้ใช้
navigator.geolocation.getCurrentPosition(
    pos => initMap(pos.coords.latitude, pos.coords.longitude),
    () => initMap()
);

// ปุ่มยืนยัน
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("confirmBtn").addEventListener("click", () => {
        if (!selectedLat || !selectedLng) {
            alert("กรุณาเลือกตำแหน่งบนแผนที่");
            return;
        }

        localStorage.setItem("selectedLat", selectedLat);
        localStorage.setItem("selectedLng", selectedLng);
        localStorage.setItem("selectedAddress", selectedAddress);

        const backPage = localStorage.getItem("mapReturn") || "employer.html";
        window.location.href = backPage;
    });
});
function confirmLocation() {

    if (!selectedLat || !selectedLng) {
        alert("กรุณาเลือกตำแหน่งก่อน");
        return;
    }

    localStorage.setItem("selectedLat", selectedLat);
    localStorage.setItem("selectedLng", selectedLng);
    localStorage.setItem(
        "selectedAddress",
        `พิกัด ${selectedLat}, ${selectedLng}`
    );

    const back = localStorage.getItem("mapReturn") || "index.html";
    window.location.href = back;
}
