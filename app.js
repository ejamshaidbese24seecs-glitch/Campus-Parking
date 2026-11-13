// CampusPark — Assignment 1 client-side prototype
// Interactions: (1) search + availability filtering, (2) planner validation and fee estimate.

const parkingZones = [
  { id: 1, name: "Main Gate Parking", area: "Main entrance", total: 80, occupied: 62, rate: 50 },
  { id: 2, name: "Central Library", area: "Academic avenue", total: 45, occupied: 45, rate: 40 },
  { id: 3, name: "Engineering Block", area: "North campus", total: 60, occupied: 38, rate: 50 },
  { id: 4, name: "Sports Complex", area: "Recreation zone", total: 70, occupied: 29, rate: 30 },
  { id: 5, name: "Administration Block", area: "Main boulevard", total: 35, occupied: 21, rate: 50 },
  { id: 6, name: "Hostel Parking", area: "Residential zone", total: 90, occupied: 90, rate: 25 }
];

const parkingList = document.querySelector("#parking-list");
const searchInput = document.querySelector("#search-input");
const availabilityFilter = document.querySelector("#availability-filter");
const resultsMessage = document.querySelector("#results-message");
const plannerForm = document.querySelector("#planner-form");
const zoneSelect = document.querySelector("#zone-select");

function getAvailable(zone) {
  return zone.total - zone.occupied;
}

function renderSummary() {
  const total = parkingZones.reduce((sum, zone) => sum + zone.total, 0);
  const occupied = parkingZones.reduce((sum, zone) => sum + zone.occupied, 0);
  const available = total - occupied;
  document.querySelector("#total-spaces").textContent = total;
  document.querySelector("#occupied-spaces").textContent = occupied;
  document.querySelector("#available-spaces").textContent = available;
  document.querySelector("#hero-available").textContent = available;
}

function renderZones(zones) {
  parkingList.replaceChildren();
  zones.forEach((zone) => {
    const available = getAvailable(zone);
    const article = document.createElement("article");
    article.className = "zone-card";
    const top = document.createElement("div");
    top.className = "zone-card-top";
    const titleWrap = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = zone.name;
    const area = document.createElement("p");
    area.textContent = zone.area;
    titleWrap.append(title, area);
    const status = document.createElement("span");
    status.className = available > 0 ? "pill" : "pill full";
    status.textContent = available > 0 ? "Available" : "Full";
    top.append(titleWrap, status);

    const numbers = document.createElement("div");
    numbers.className = "zone-numbers";
    numbers.innerHTML = `<div><strong>${available}</strong><span>Available</span></div><div><strong>${zone.occupied}/${zone.total}</strong><span>Occupied / total</span></div><div><strong>Rs. ${zone.rate}</strong><span>Per hour</span></div>`;
    article.append(top, numbers);
    parkingList.append(article);
  });
  resultsMessage.textContent = zones.length
    ? `Showing ${zones.length} of ${parkingZones.length} parking zones.`
    : "No matching zones. Try another search or filter.";
}

// Interaction 1: search text and availability dropdown work together.
// A zone is shown only if it matches BOTH the search text AND the selected filter.
function filterZones() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedFilter = availabilityFilter.value;

  const filteredZones = parkingZones.filter((zone) => {
    // Search by zone name (case-insensitive) - matches the input placeholder
    const matchesSearch = zone.name.toLowerCase().includes(searchTerm);

    // Availability filter: "all", "available" or "full"
    const available = getAvailable(zone);
    const matchesAvailability =
      selectedFilter === "all" ||
      (selectedFilter === "available" && available > 0) ||
      (selectedFilter === "full" && available === 0);

    return matchesSearch && matchesAvailability;
  });

  renderZones(filteredZones);
}

// Interaction 2: validate input, check availability and estimate the fee.
const MOTORCYCLE_DISCOUNT = 0.2; // 20% discount for motorcycles
const MIN_HOURS = 1;
const MAX_HOURS = 12;

function showPlanResult(element, message, type) {
  // type is "error", "success" or "" (neutral)
  element.className = type ? `plan-result ${type}` : "plan-result";
  element.textContent = message;
}

function handlePlanSubmit(event) {
  event.preventDefault();
  const formData = new FormData(plannerForm);
  const visitorName = formData.get("visitorName").trim();
  const vehicleType = formData.get("vehicleType");
  const zoneId = Number(formData.get("zone"));
  const duration = Number(formData.get("duration"));
  const result = document.querySelector("#plan-result");

  // 1. Validation
  if (visitorName.length < 2) {
    showPlanResult(result, "Please enter your name (at least 2 characters).", "error");
    return;
  }
  if (vehicleType !== "car" && vehicleType !== "motorcycle") {
    showPlanResult(result, "Please select a vehicle type.", "error");
    return;
  }
  const zone = parkingZones.find((z) => z.id === zoneId);
  if (!zone) {
    showPlanResult(result, "Please select a parking zone.", "error");
    return;
  }
  if (!Number.isInteger(duration) || duration < MIN_HOURS || duration > MAX_HOURS) {
    showPlanResult(
      result,
      `Duration must be a whole number between ${MIN_HOURS} and ${MAX_HOURS} hours.`,
      "error"
    );
    return;
  }

  // 2. Availability check
  const available = getAvailable(zone);
  if (available <= 0) {
    const alternatives = parkingZones
      .filter((z) => getAvailable(z) > 0)
      .map((z) => z.name)
      .join(", ");
    showPlanResult(
      result,
      `Sorry ${visitorName}, ${zone.name} is full right now. Try: ${alternatives}.`,
      "error"
    );
    return;
  }

  // 3. Fee calculation: hourly rate x hours, with a motorcycle discount
  let fee = zone.rate * duration;
  let discountNote = "";
  if (vehicleType === "motorcycle") {
    fee = fee * (1 - MOTORCYCLE_DISCOUNT);
    discountNote = " (includes 20% motorcycle discount)";
  }

  showPlanResult(
    result,
    `Good news, ${visitorName}! ${zone.name} has ${available} space(s) available. ` +
      `Estimated fee for ${duration} hour(s) as a ${vehicleType}: Rs. ${fee.toFixed(2)}${discountNote}. ` +
      `This is a demo estimate; no space has been reserved.`,
    "success"
  );
}

function populateZoneOptions() {
  parkingZones.forEach((zone) => {
    const option = document.createElement("option");
    option.value = zone.id;
    option.textContent = zone.name;
    zoneSelect.append(option);
  });
}

searchInput.addEventListener("input", filterZones);
availabilityFilter.addEventListener("change", filterZones);
plannerForm.addEventListener("submit", handlePlanSubmit);

renderSummary();
populateZoneOptions();
renderZones(parkingZones);
