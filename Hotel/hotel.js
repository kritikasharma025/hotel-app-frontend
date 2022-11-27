function onClickHotel (id) {
    const hotel = document.querySelector(`#${id}`);
    console.log(hotel.children[1].innerHTML)
    sessionStorage.setItem("hotelSearch", hotel.children[1].innerHTML);
    document.location.href = "http://localhost:5500/Hotel/hotelDetail.html"
  }

function onClickHotelImage (id) {
    const hotel = document.querySelector(`#${id}`);
    console.log(hotel.children[0].innerHTML)
    sessionStorage.setItem("hotelSearch", hotel.children[0].innerHTML);
    document.location.href = "http://localhost:5500/Hotel/hotelDetail.html"
}

const cityName = document.querySelector("#cityName");

window.onload = function () {
    cityName.innerHTML = sessionStorage.getItem("hotelSearch")
}