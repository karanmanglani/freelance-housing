document.addEventListener("DOMContentLoaded", () => {
  const propertiesGrid = document.querySelector(".properties-grid");
  if (!propertiesGrid) return;

  const fetchAndRenderProperties = async () => {
    try {
      const response = await fetch(`${API_URL}/properties`);
      if (!response.ok) throw new Error("Could not fetch properties.");

      const properties = await response.json();
      propertiesGrid.innerHTML = "";

      properties.forEach((prop) => {
        const card = document.createElement("div");
        card.className = "property-card";
        card.innerHTML = `
                    <div class="card-image-container">
                        <img src="${prop.imageUrl}" alt="${prop.name}" />
                        <div class="card-category">FOR SALE</div>
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${prop.name}</h3>
                        <div class="card-location">📍 ${prop.location}</div>
                        <div class="card-price">₹${prop.price.toLocaleString()}</div>
                    </div>
                `;
        card.addEventListener("click", () => {
          window.location.href = `property-details.html?id=${prop._id}`;
        });
        propertiesGrid.appendChild(card);
      });
    } catch (error) {
      console.error(error);
      propertiesGrid.innerHTML = `<p>Could not load properties at this time.</p>`;
    }
  };

  fetchAndRenderProperties();
});
