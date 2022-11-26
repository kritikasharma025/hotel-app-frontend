const rangeSlider = document.getElementById("customRange1");
let endPrice;

const displayLoader = () => {
  document.getElementById('populateHere').innerHTML = '<div class="loader my-5 spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
}

const hideLoader = () => {
  document.getElementById('populateHere').innerHTML = ''
}

rangeSlider.oninput = async function () {
  endPrice = this.value;
  rangeSlider.setAttribute("title", endPrice)
  displayLoader()
  let data = await fetch("https://hotel-app-backend.onrender.com/api/place", {
    method: "POST",
    body: JSON.stringify({
        endPrice:endPrice || 0,
        country: sessionStorage.getItem("country") || ""
      }),
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
  });

  data = await data.json();
  hideLoader()
  document.getElementById("populateHere").innerHTML = ""
  if(data.data.length > 0){
    data.data.map((dat, key) => {
        document.getElementById("populateHere").innerHTML =
          document.getElementById("populateHere").innerHTML +
          `
            <div class="col-12 col-md-4 col-lg-3 my-2">
                        <div class="card">
                            <img src=${
                              dat.image
                            } class="card-img-top img-fluid rounded" alt=${key}>
                            <div class="card-body ">
                              <h5 class="card-title">${dat.city[0].toUpperCase()}${dat.city.slice( 1 )}</h5>
                              <p class="card-text">Average Spent Rs. ${
                                dat.price
                              }</p>
                             <a href="./page6.html" class="btn btn-primary btn-sm rounded fs-6 w-50 ">Go somewhere</a>
                            </div>
                          </div>
                    </div>`;
      });
  }
  else{
    document.getElementById("populateHere").innerHTML = "<h3 class='text-center'>No Places to visit at this price range!</h3>"
  }
};

const countryInput = document.getElementById("countryName");
var suggestionListCountry = document.getElementById("suggestionListCountry")

countryInput.onkeyup = async function () {
  const input = String(this.value).toLowerCase();
  let data = await fetch(`https://hotel-app-backend.onrender.com/api/place/getUniqueCountry`, {
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    method:"POST",
    body: JSON.stringify({
      "country":input
    })
  })
  data = await data.json()

  suggestionListCountry.innerHTML = ""
  if(data?.message.length > 0){
    data?.message.map((dat, idx)=>{
      let sugg = `<option value=${dat}>${dat}</option>`
      if(!suggestionListCountry.innerHTML.includes(sugg)){
        suggestionListCountry.innerHTML = suggestionListCountry.innerHTML + `<option class="w-100" value=${dat}>${dat.toUpperCase()}</option>`
      }
    })
  }else{
    suggestionListCountry.innerHTML = `<option class="w-100" >No Data</option>`
  }
}

const findPlaces = () => {
  if(countryInput.value.length > 1){
    sessionStorage.setItem("country", countryInput.value)
    document.location.href = "http://localhost:5500/country.html";
  }
}

let countryName = document.querySelector("#countryName");

window.onload = async function () {
    countryName.innerHTML = `EXPLORE ${sessionStorage.getItem("country").toUpperCase()}`

    displayLoader()

    let countryPlaces = await fetch("https://hotel-app-backend.onrender.com/api/place/getCountry", {
      body:JSON.stringify({country:sessionStorage.getItem("country")}),
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    })

    let data = await countryPlaces.json()

    hideLoader()
    document.getElementById("populateHereSuggestions").innerHTML = ""
    if(data.message.length > 0){
      data.message.map((dat, key) => {
          document.getElementById("populateHereSuggestions").innerHTML =
            document.getElementById("populateHereSuggestions").innerHTML +
            `
                          <div class="col-12 col-md-4 col-lg-3 my-2">
                             <div class="card" style="width: 20rem;">
                                <img src=${dat.image} class="card-img-top img-fluid rounded" alt=${key}>
                                <div class="card-body ">
                                  <h5 class="card-title">${dat.city[0].toUpperCase()}${dat.city.slice( 1 )}</h5>
                                  <h6>Average Spent Rs. ${dat.price}</h6>
                                 <a href="./page7.html" class="btn btn-primary btn-sm rounded fs-6 w-50 ">Go somewhere</a>
                                </div>
                              </div>
                        </div>
            `
        });
      }
}