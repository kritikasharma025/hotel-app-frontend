// var appUrl = "https://kritikasharma025.github.io/hotel-app-frontend"
var appUrl = "http://localhost:5500";
var serverUrl = "http://localhost:8080/api"
// var serverUrl = "https://hotel-app-backend.onrender.com/api"

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
let populateHotel = document.querySelector("#populateHotelsHere");

window.onload = async function () {
    cityName.innerHTML = sessionStorage.getItem("hotelSearch")

    populateHotel.innerHTML = '<div class="loader my-5 spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>'

    let hotelData = await fetch(`${serverUrl}/hotel`,{
        headers:{
            "Accept":"application.json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            city: sessionStorage.getItem("hotelSearch").toLowerCase()
        }),
        method:"POST"
    })

    hotelData = await hotelData.json()

if(hotelData.message.length > 0){
    populateHotel.innerHTML = ""
    Promise.all(hotelData.message.map((hotel, idx) => {
        populateHotel.innerHTML += `<div class="row mt-2">
        <div class="col-md-4 mt-3 ">
            <img src=${hotel.image} alt=${idx} width="100%">
        </div>
        <div class="col-md-8 mt-3">
            <h4 class=" text-center ">${hotel.name}<br class="mt-5"><span
                    class="fst-italic text-opacity-50 text-danger mt-2">Rs. ${hotel.price}/night</span></h4>
            <p class="card-text mt-3 text-justify text-center fst-italic">${hotel.city.toUpperCase()}</p>
        </div>
    </div>`
    }))
}else{
    populateHotel.innerHTML = ""
    populateHotel.innerHTML = "<h3>Currently we are not serving this city, but soon we will update it with the team.</h3>"
}
}