import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

function loadParkData() {
  document.getElementById("parkName").textContent = "Yellowstone";
  document.getElementById("parkType").textContent = "National Park";
  document.getElementById("parkStates").textContent = "WY, ID, MT";
  document.querySelector("#park-image").src = "images/yellowstone.jpg";
}

// Website Park Part 2  

function addEventListeners() {
  const menuTrigger = document.querySelector("#header-menu-trigger");
  const menuOptions = document.querySelector("#header-menu-options");
  const overview = document.querySelector("#overview");

  // MENU toggle
  if (menuTrigger && menuOptions) { 
    menuTrigger.addEventListener("click", () => {
      menuOptions.classList.toggle("is-hidden");
    });

    // Event delegation (single listener)
    menuOptions.addEventListener("click", (event) => {
      const itemName = event.target.textContent;
      console.log(itemName);
    });
  }

  // Overlay hover color toggle
  if (overview) { // Don't add these listeners if the element doesn't exist
    overview.addEventListener("mouseenter", () => {
      overview.classList.add("overlay-hover");
    });

    overview.addEventListener("mouseleave", () => {
      overview.classList.remove("overlay-hover");
    });
  }
}



// Website Park Part 3  

function setupMapModalAndPromotions() {
  const headerMapsLink = document.getElementById("header-maps-link");
  const parkMapsLink = document.getElementById("park-maps-link");
  const mapModal = document.getElementById("map-modal");
  const mapModalClose = document.getElementById("map-modal-close");
  const promotionMessage = document.getElementById("promotion-message");

  function openMapModal() {
    document.body.style.overflow = "hidden"; // disable scroll
    if (mapModal) mapModal.classList.remove("is-hidden");
  }

  function closeMapModal() {
    if (mapModal) mapModal.classList.add("is-hidden");
    document.body.style.overflow = "auto";   // re-enable scroll
  }

  headerMapsLink?.addEventListener("click", openMapModal);
  parkMapsLink?.addEventListener("click", openMapModal);
  mapModalClose?.addEventListener("click", closeMapModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMapModal();
    }
  })
  
  const weekdayPromotions = {
      1: "Monday Special: Buy one get one park entrance.",
      2: "Tuesday Deal: 10% off park admissions.",
      3: "Wednesday Offer: Free junior ranger booklet with entry.",
      4: "Thursday Bonus: Free Yellowstone postcard at check-in.",
      5: "Friday Feature: 15% off annual pass upgrade."
    };

  const day = new Date().getDay();
  if (promotionMessage) {
    if (day === 0 || day === 6) {
      promotionMessage.textContent = "No Promotions today";
    } else {
      promotionMessage.textContent = weekdayPromotions[day];
    }
  }
}

loadParkData();
setupMapModalAndPromotions();
addEventListeners();