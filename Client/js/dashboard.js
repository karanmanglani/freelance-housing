document.addEventListener("DOMContentLoaded", () => {
  const propertyModal = document.getElementById("propertyModal");
  const propertyForm = document.getElementById("propertyForm");
  const propertyList = document.getElementById("property-list");
  const addPropertyBtn = document.getElementById("addPropertyBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");

  const token = localStorage.getItem("userToken");
  const user = JSON.parse(localStorage.getItem("userData"));

  // Page Protection
  if (!token || !user || user.role !== "owner") {
    alert("Access denied.");
    window.location.href = "index.html";
    return;
  }

  const authHeader = { Authorization: `Bearer ${token}` };

  // Fetch and Render Owner's Properties
  const fetchMyProperties = async () => {
    try {
      const response = await fetch(`${API_URL}/properties/myproperties`, {
        headers: authHeader,
      });
      if (!response.ok) throw new Error("Failed to fetch properties.");

      const properties = await response.json();
      propertyList.innerHTML = "";
      if (properties.length === 0) {
        propertyList.innerHTML = `<p id="no-properties-message">You have no properties listed yet.</p>`;
        return;
      }
      properties.forEach((prop) => {
        const card = document.createElement("div");
        card.className = "property-card";
        card.innerHTML = `
                    <div class="card-image-container"><img src="${
                      prop.imageUrl
                    }" alt="${prop.name}" class="card-image"></div>
                    <div class="card-content">
                        <h3>${prop.name}</h3>
                        <p>₹${prop.price.toLocaleString()}</p>
                        <p>${prop.location}</p>
                        <p class="card-details">${prop.details}</p>
                    </div>
                    <div class="card-footer"><button class="remove-btn" data-id="${
                      prop._id
                    }">Remove</button></div>
                `;
        propertyList.appendChild(card);
      });
    } catch (error) {
      propertyList.innerHTML = `<p>Error loading properties.</p>`;
    }
  };

  // Modal & Form Logic
  addPropertyBtn.addEventListener("click", () =>
    propertyModal.classList.add("active")
  );
  closeModalBtn.addEventListener("click", () =>
    propertyModal.classList.remove("active")
  );

  propertyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById("propertyName").value,
      price: document.getElementById("propertyPrice").value,
      location: document.getElementById("propertyLocation").value,
      imageUrl: document.getElementById("propertyImage").value,
      details: document.getElementById("propertyDetails").value,
    };
    try {
      const response = await fetch(`${API_URL}/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error((await response.json()).message);
      propertyModal.classList.remove("active");
      propertyForm.reset();
      fetchMyProperties();
    } catch (error) {
      alert(`Error adding property: ${error.message}`);
    }
  });

  // Delete Property Logic
  propertyList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const propertyId = e.target.dataset.id;
      if (confirm("Are you sure you want to remove this property?")) {
        try {
          const response = await fetch(`${API_URL}/properties/${propertyId}`, {
            method: "DELETE",
            headers: authHeader,
          });
          if (!response.ok) throw new Error("Failed to delete property.");
          fetchMyProperties();
        } catch (error) {
          alert(`Error: ${error.message}`);
        }
      }
    }
  });
  fetchMyProperties();
});
