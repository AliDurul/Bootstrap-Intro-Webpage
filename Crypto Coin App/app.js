const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msgSpan = document.querySelector(".container .msg");
const coinList = document.querySelector(".ajax-section .container .coins");

localStorage.setItem(
  "apiKey",
  EncryptStringAES(
    "coinranking772f9ce3a5c8ea81c12b209ce13faf6829e06b6a18df32b7"
  )
);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === "") return;

  getCoinDataFromAi();

  form.reset();
  form.focus();
});

const getCoinDataFromAi = () => {
  const API_KEY = DecryptStringAES(localStorage.getItem("apiKey"));
  const URL = `https://api.coinranking.com/v2/coins?search=${input.value}&limit=1`;

  const options = {
    headers: {
      "x-access-token": API_KEY,
    },
  };

  fetch(URL, options)
    .then((response) => {
      // throw new Error("kardes nbiseyler ters")
      return response.json();
    })
    .then((result) => displayCoin(result))
    .catch((err) => console.log(err));
};

const displayCoin = (result) => {
  const { symbol, name, iconUrl, change, price } = result.data.coins[0];

  checkForDuplicate(name);

  const createdli = document.createElement("li");
  createdli.classList.add("coin");
  createdli.innerHTML = `
    <h2 class="coin-name" data-name=${name}>
        <span>${name}</span>
        <sup>${symbol}</sup>
    </h2>
    <div class="coin-temp">$${Number(price).toFixed(6)}</div>
    <figure>
        <img class="coin-icon" src=${iconUrl}>                
            <figcaption style='color:${change < 0 ? "red" : "green"}'>
                <span><i class="fa-solid fa-chart-line"></i></span>
                <span>${change}%</span>
            </figcaption>
    </figure>
    <span class="remove-icon">
        <i class="fas fa-window-close" style="color:red"></i>
    </span>
    `;
  coinList.prepend(createdli);
  deleteCoinCard();
};

const checkForDuplicate = (name) => {
  const coinName = document.querySelectorAll(".coins h2 span");

  const filteredCoinName = [...coinName].filter((span) => span.innerText == name );
  console.log(filteredCoinName);
//   if (filteredCoinName.length > 0) {}
};

const deleteCoinCard = () => {
  const removeIcon = document.querySelector(".remove-icon");

  removeIcon.addEventListener("click", (e) => {
    e.target.closest("li").remove();
  });
};
