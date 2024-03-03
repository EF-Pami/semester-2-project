import { API_BASE_URL, ALL_LISTINGS } from "../constants.mjs";
import { UserCredits } from "../utils/usercredit.mjs";
import { userProfileAvatar } from "../utils/userAvatar.mjs";
import { logout, manageLoginButton } from "../api/auth/logout.mjs";
import { placeBid } from "./createBid.mjs";
import { API_KEY } from "../components/apikeymodel.mjs";

placeBid();
UserCredits();
userProfileAvatar();
logout();

export async function fetchSingleListing() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const listingID = urlParams.get("listingId");
        console.log("Listing ID:", listingID);

        if (!listingID) {
            console.error("Listing Id not found");
            return;
        }
        const apiKey = API_KEY;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": apiKey,
            },
        };

        const response = await fetch(
            `${API_BASE_URL}${ALL_LISTINGS}/${listingID}?_seller=true&_bids=true`,
            options,
        );
        if (response.ok) {
            const data = await response.json();
            console.log("Single Listing:", data.data);
      
            const auctionTitleElement = document.getElementById("auctionTitle");
            const auctionItemInfoElement = document.getElementById("auctionItemInfo");
            const auctionEndsAtElement = document.getElementById("auctionEndsAt");
            const auctionBidsElement = document.getElementById(
              "auctionBidsContainer",
            );
            const bidDenier = localStorage.getItem("accessToken");
      
            if (bidDenier === null) {
              const bidButton = document.getElementById("placeBid");
              bidButton.disabled = true;
      
              if (auctionBidsElement) {
                auctionBidsElement.innerHTML = `<h3 class="text-white text-stroke bg-card rounded-top" >Bids</h3>
                <p class="text-black fw-bold">Login to view bids</p>`;
              }
            } else {
              if (auctionBidsElement) {
                auctionBidsElement.innerHTML =
                  '<h3 class="text-white text-stroke bg-card rounded-top" >Bids</h3>';
      
                if (data.data.bids && data.data.bids.length > 0) {
                  data.data.bids.forEach((bid) => {
                    const bidElement = document.createElement("p");
                    bidElement.textContent = `${bid.bidder.name} bid: ${bid.amount} Credits`;
                    auctionBidsElement.appendChild(bidElement);
                  });
                } else {
                  const noBidsMessage = document.createElement("p");
                  noBidsMessage.textContent = "No bids have been placed yet.";
                  auctionBidsElement.appendChild(noBidsMessage);
                }
              }
            }     
      
            if (auctionEndsAtElement) {
              const endsAtDate = new Date(data.data.endsAt);
              const currentDate = new Date();
      
              if (endsAtDate < currentDate) {
                if (auctionTitleElement) {
                  auctionTitleElement.textContent = "Bidding time expired";
                  const bidButton = document.getElementById("placeBid");
                  bidButton.disabled = true;
                }
      
                if (auctionItemInfoElement) {
                  auctionItemInfoElement.innerHTML = "";
      
                  const img = document.createElement("img");
                  img.src = "../asset/icon_search_.jpg";
                  img.classList.add("rounded-4", "auction-item", "mt-4", "img-fluid");
                  img.alt = "Listing Item Image";
                  auctionItemInfoElement.appendChild(img);
      
                  const endedAuctionInfo = document.createElement("p");
                  endedAuctionInfo.textContent =
                    "Obbs sorry this product is sold out!";
                  auctionItemInfoElement.appendChild(endedAuctionInfo);
                }
      
                if (auctionEndsAtElement) {
                  auctionEndsAtElement.textContent = "Bidding has ended";
                }
              } else {
                if (auctionTitleElement) {
                  auctionTitleElement.textContent = data.data.title;
                }
      
                if (auctionItemInfoElement) {
                  const mediaArray = data.data.media;
      
                  if (auctionItemInfoElement && mediaArray && mediaArray.length > 0) {
                    mediaArray.forEach((media, index) => {
                      const img = document.createElement("img");
                      img.src = media.url;
                      img.classList.add("rounded-4", "auction-item", "mt-4", "img-fluid");
                      img.alt = `${data.data.title} - Image ${index + 1}`;
                      auctionItemInfoElement.appendChild(img);
                    });
                  }
      
                  const seller = data.data.seller.name;
                  const sellerElement = document.createElement("h3");
                  sellerElement.classList.add("mt-2", "fw-bold", "text-black");
                  sellerElement.textContent = `Seller: ${seller}`;
                  auctionItemInfoElement.appendChild(sellerElement);
      
                  const description = data.data.description;
                  const paragraphElement = document.createElement("p");
                  paragraphElement.classList.add("mt-4");
                  paragraphElement.textContent = description;
                  auctionItemInfoElement.appendChild(paragraphElement);
                }
      
                if (auctionEndsAtElement) {
                  const endsAtText = document.createElement("span");
                  endsAtText.textContent = `Bidding expires in: ${endsAtDate.toLocaleDateString()} , ${endsAtDate.toLocaleTimeString()}`;
                  auctionEndsAtElement.appendChild(endsAtText);
                }
              }
            }
          } else {
            console.error("Error:", response.status, response.statusText);
          }
    } catch (error) {
        console.error("fetch error:", error.message);
    }
}

fetchSingleListing();

document.addEventListener("DOMContentLoaded", function () {
  manageLoginButton();
});