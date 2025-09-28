document.addEventListener("DOMContentLoaded", () => {
  // This script replaces the placeholder logic in property-details.html
  const loadingSpinner = document.getElementById("loading");
  const mainContent = document.getElementById("main-content");
  const timeSlotsGrid = document.getElementById("time-slots");
  const bookingForm = document.getElementById("booking-form");

  let selectedSlot = null;
  const propertyId = new URLSearchParams(window.location.search).get("id");

  const loadPropertyDetails = async () => {
    if (!propertyId) {
      mainContent.innerHTML = "<h1>Property not found.</h1>";
      loadingSpinner.style.display = "none";
      return;
    }
    try {
      const response = await fetch(`${API_URL}/properties/${propertyId}`);
      if (!response.ok) throw new Error("Property not found.");
      const { property, bookedSlots } = await response.json();

      renderPropertyData(property);
      renderTimeSlots(bookedSlots);

      loadingSpinner.style.display = "none";
      mainContent.style.display = "block";
    } catch (error) {
      mainContent.innerHTML = `<h1>Error: ${error.message}</h1>`;
      loadingSpinner.style.display = "none";
      mainContent.style.display = "block";
    }
  };

  const renderPropertyData = (p) => {
    document.getElementById("property-title").textContent = p.name;
    document.getElementById("property-location").textContent = p.location;
    document.getElementById(
      "property-price"
    ).textContent = `₹${p.price.toLocaleString()}`;
    document.getElementById("property-description").textContent = p.details;
    document.getElementById("property-main-image").src = p.imageUrl;
  };

  const renderTimeSlots = (bookedSlots) => {
    timeSlotsGrid.innerHTML = "";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let d = 0; d < 3; d++) {
      const day = new Date(today);
      day.setDate(day.getDate() + d);
      for (let hour = 10; hour <= 17; hour++) {
        const slotDate = new Date(day);
        slotDate.setHours(hour, 0, 0, 0);
        const slotISO = slotDate.toISOString();
        const isBooked = bookedSlots.includes(slotISO);
        const slotElement = document.createElement("div");
        slotElement.className = "time-slot";
        slotElement.textContent = `${hour}:00`;
        if (isBooked) {
          slotElement.classList.add("booked");
        } else {
          slotElement.classList.add("available");
          slotElement.addEventListener("click", () => {
            document
              .querySelectorAll(".time-slot.selected")
              .forEach((el) => el.classList.remove("selected"));
            slotElement.classList.add("selected");
            selectedSlot = slotISO;
            bookingForm.style.display = "block";
          });
        }
        timeSlotsGrid.appendChild(slotElement);
      }
    }
  };

  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("You must be logged in to book a visit.");
      return;
    }
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ propertyId, slot: selectedSlot }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      alert("Booking successful!");
      loadPropertyDetails(); // Refresh slots
    } catch (error) {
      alert(`Booking failed: ${error.message}`);
    }
  });

  loadPropertyDetails();
});
