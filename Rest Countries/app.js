const countrySelect = document.querySelector(".country_select select");
const countryCard = document.querySelector(".country_card");

/* variables */

let countries = "";

window.addEventListener("load", () => {
  getCountries();
});

countrySelect.addEventListener("change", (e) => {
  let countryName = e.target.value;
  if (countryName) {
    const selectedCountry = countries.filter(
      (country) => country.name.common === countryName
    );
    displayContry(selectedCountry[0]);
  }
});

/* function */
const getCountries = () => {
  fetch(
    "https://restcountries.com/v3.1/all?fields=name,region,capital,currencies,population,flags,maps,borders,currencies,languages"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => getCountryName(data))
    .catch((err) => console.log(err));
};

const getCountryName = (data) => {
  countries = data;
  // creating new option
  countries.forEach((country) => {
    countrySelect.innerHTML += `
          <option value="${country.name.common}">${country.name.common}</option>`;
  });
};

const displayContry = (country) => {
  console.log(country);
  const {name: { common }, capital,region,flags: { svg },languages,currencies,population,borders,maps} = country;



//   countryCard.innerHTML= `
//   <div class="card m-auto shadow-lg" style="width: 22rem;">
//             <img src="" class="card-img-top" alt="resim gelicek">
//             <div class="card-body p-2">
//               <h5 class="card-title">Card title</h5>
//             </div>
//             <ul class="list-group list-group-flush">
//                 <li class="list-group-item">
//                   <i class="fa-solid fa-earth-oceania"></i><span class="fw-bold"> Region:</span>
//                 </li>
//                 <li class="list-group-item">
//                   <i class="fas fa-lg fa-landmark"></i>
//                   <span class="fw-bold"> Capitals:</span>
//                 </li>
//                 <li class="list-group-item">
//                   <i class="fas fa-lg fa-comments"></i>
//                   <span class="fw-bold"> Languages:</span>
//                 </li>
//                 <li class="list-group-item">
//                   <i class="fas fa-lg fa-money-bill-wave"></i>
//                   <span class="fw-bold"> Currencies:</span>

//                 </li>
//                 <li class="list-group-item">
//                 <i class="fa-solid fa-people-group"></i></i>
//                 <span class="fw-bold"> Population:</span>
//               </li>
//                 <li class="list-group-item">
//                 <i class="fa-sharp fa-solid fa-road-barrier"></i>
//                 <span class="fw-bold"> Borders:</span>
//               </li>
//               </li>
//               <li class="list-group-item">
//                 <i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> Map:</span> <a href=""> Go to google map</a> </li>
//               </ul>
//             <div class="card-body">
//               <a href="#" class="card-link">Card link</a>
//               <a href="#" class="card-link">Another link</a>
//             </div>
//           </div>
//   `

}