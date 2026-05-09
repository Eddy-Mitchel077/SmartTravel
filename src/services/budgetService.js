/**
 * Calcule le coût du vol selon la destination
 */
function calculateFlightCost(destination) {
  return destination === 'Asie' ? 800 : 300;
}

/**
 * Calcule le prix de base de l'hôtel
 */
function getHotelBasePrice(hotel) {
  const prices = {
    luxe: 200,
    standard: 100,
    budget: 50
  };
  return prices[hotel] || 100;
}

/**
 * Applique le supplément enfants
 */
function applyChildrenSupplement(hotelPrice, hasChildren) {
  return hasChildren ? hotelPrice * 1.5 : hotelPrice;
}

/**
 * Calcule le coût all inclusive
 */
function calculateAllInclusive(pension, days, persons) {
  return pension === 'all-inclusive' ? 50 * days * persons : 0;
}

/**
 * Applique la réduction réservation anticipée
 */
function applyEarlyBookingDiscount(total, bookingDate) {
  const today = new Date();
  const booking = new Date(bookingDate);
  const diffMonths = (booking - today) / (1000 * 60 * 60 * 24 * 30);
  return diffMonths > 6 ? total * 0.85 : total;
}

/**
 * Calcule le budget total du voyage
 */
function calculateBudget(data) {
  const { destination, hotel, days, persons, children, pension, bookingDate } = data;

  const flightCost = calculateFlightCost(destination);
  const hotelBasePrice = getHotelBasePrice(hotel);
  const hotelPrice = applyChildrenSupplement(hotelBasePrice, children);
  const allInclusiveCost = calculateAllInclusive(pension, days, persons);

  const subtotal = flightCost + (hotelPrice * days) + allInclusiveCost;
  const totalBudget = applyEarlyBookingDiscount(subtotal, bookingDate);

  return {
    flightCost,
    hotelPrice,
    allInclusiveCost,
    totalBudget: Math.round(totalBudget * 100) / 100
  };
}

module.exports = {
  calculateBudget,
  calculateFlightCost,
  getHotelBasePrice,
  applyChildrenSupplement,
  calculateAllInclusive,
  applyEarlyBookingDiscount
};
