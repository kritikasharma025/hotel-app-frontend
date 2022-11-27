var appUrl = "https://kritikasharma025.github.io/hotel-app-frontend"
// var appUrl = "http://localhost:5500";
// var serverUrl = "http://localhost:8080/api"
var serverUrl = "https://hotel-app-backend.onrender.com/api"

function onClickHotel (id) {
    const hotel = document.querySelector(`#${id}`);
    console.log(hotel.children[1].innerHTML)
    sessionStorage.setItem("hotelSearch", hotel.children[1].innerHTML);
    document.location.href = `${appUrl}/Hotel/hotelDetail.html`
  }

function onClickHotelImage (id) {
    const hotel = document.querySelector(`#${id}`);
    console.log(hotel.children[0].innerHTML)
    sessionStorage.setItem("hotelSearch", hotel.children[0].innerHTML);
    document.location.href = `${appUrl}/Hotel/hotelDetail.html`
}

const cityName = document.querySelector("#cityName");

window.onload = function () {
    cityName.innerHTML = sessionStorage.getItem("hotelSearch")
}