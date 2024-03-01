import { API_BASE_URL, ALL_LISTINGS } from "../constants.mjs";
import { hideCreateList } from "../utils/hideCreateList.mjs";

export async function fetchListings (filterType = 'newest') {
    try {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(API_BASE_URL + ALL_LISTINGS, options);
        if (response.ok) {
            const data = await response.json();

            switch(filterType) {
                case 'newest':
                    data.data.sort((a, b) => new Date(b.created) - new Date(a.created));
                    break;
                case 'endingSoon':
                    data.data.sort((a, b) => new Date(a.created) - new Date(b.created));
                    break;
                case 'mostBids':
                    data.data.sort((a, b) => b._count.bids - a._count.bids);
                    break;
                case 'leastBids':
                    data.data.sort((a, b) => a._count.bids - b._count.bids);
                    break;
            }

            const listingsContainer = document.getElementById("listing-container");

            console.log(data);

            listingsContainer.innerHTML = "";

            data.data.forEach((listing) => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.style.width = "18rem";
        
                const img = document.createElement("img");
                img.src = listing.media[0].url;
                img.classList.add("card-img-top", "card-img", "mt-2");
                img.alt = listing.title;
        
                const cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
        
                const title = document.createElement("h5");
                title.classList.add("card-title", "fw-bold");
                title.textContent = listing.title;
        
                const endDate = document.createElement("p");
                endDate.textContent = `Auction end date: ${new Date(listing.endsAt).toLocaleDateString()}`;
        
                const viewBidButton = document.createElement("a");
                const singleListingUrl = "../auction.html";
                const linkWithQueryParameter = `${singleListingUrl}?listingId=${listing.id}`;
                viewBidButton.href = linkWithQueryParameter;
                viewBidButton.classList.add(
                  "btn",
                  "btn-primary",
                  "btn-auction",
                  "text-white",
                  "fw-bold",
                  "text-stroke",
                );
                viewBidButton.textContent = "View & Bid";
                viewBidButton.dataset.listingId = listing.id;
        
                cardBody.appendChild(title);
                cardBody.appendChild(endDate);
                cardBody.appendChild(viewBidButton);
                card.appendChild(img);
                card.appendChild(cardBody);
        
                listingsContainer.appendChild(card);
        
                const endAuctionDate = new Date(listing.endsAt);
                const currentDate = new Date();
        
                if (endAuctionDate < currentDate) {
                  viewBidButton.textContent = "Biding End";
                  endDate.textContent = `Biding ended at: ${new Date(listing.endsAt).toLocaleDateString()}`;
                }
            });
        } else {
              console.error("Error:", response.status, response.statusText);
        }
    } catch (error) {
            console.error("Fetch error:", error.message);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const filterSelect = document.getElementById('auctionFilter');
    
    filterSelect.addEventListener('change', () => {
      const selectedFilter = filterSelect.value;
      
      fetchListings(selectedFilter);
    });
    
    fetchListings();
});

hideCreateList();
    
