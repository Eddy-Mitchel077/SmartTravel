const {
  calculateFlightCost,
  getHotelBasePrice,
  applyChildrenSupplement,
  calculateAllInclusive,
  applyEarlyBookingDiscount,
  calculateBudget
} = require('../src/services/budgetService');

describe('calculateFlightCost', () => {
  test('Asie → 800€', () => {
    expect(calculateFlightCost('Asie')).toBe(800);
  });

  test('Europe → 300€', () => {
    expect(calculateFlightCost('Europe')).toBe(300);
  });

  test('Autre destination → 300€', () => {
    expect(calculateFlightCost('Amerique')).toBe(300);
  });
});

describe('getHotelBasePrice', () => {
  test('Luxe → 200€', () => {
    expect(getHotelBasePrice('luxe')).toBe(200);
  });

  test('Standard → 100€', () => {
    expect(getHotelBasePrice('standard')).toBe(100);
  });

  test('Budget → 50€', () => {
    expect(getHotelBasePrice('budget')).toBe(50);
  });

  test('Inconnu → 100€ par défaut', () => {
    expect(getHotelBasePrice('inconnu')).toBe(100);
  });
});

describe('applyChildrenSupplement', () => {
  test('Avec enfants → prix x1.5', () => {
    expect(applyChildrenSupplement(100, true)).toBe(150);
  });

  test('Sans enfants → prix inchangé', () => {
    expect(applyChildrenSupplement(100, false)).toBe(100);
  });
});

describe('calculateAllInclusive', () => {
  test('All inclusive → 50 x jours x personnes', () => {
    expect(calculateAllInclusive('all-inclusive', 7, 2)).toBe(700);
  });

  test('Pas all inclusive → 0', () => {
    expect(calculateAllInclusive('none', 7, 2)).toBe(0);
  });
});

describe('applyEarlyBookingDiscount', () => {
  test('Réservation > 6 mois → réduction 15%', () => {
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 8);
    const result = applyEarlyBookingDiscount(1000, futureDate.toISOString());
    expect(result).toBe(850);
  });

  test('Réservation < 6 mois → pas de réduction', () => {
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 2);
    const result = applyEarlyBookingDiscount(1000, futureDate.toISOString());
    expect(result).toBe(1000);
  });
});

describe('calculateBudget', () => {
  test('Budget complet Asie all-inclusive avec enfants', () => {
    const result = calculateBudget({
      destination: 'Asie',
      hotel: 'standard',
      days: 7,
      persons: 2,
      children: true,
      pension: 'all-inclusive',
      bookingDate: '2025-06-01'
    });
    expect(result.flightCost).toBe(800);
    expect(result.hotelPrice).toBe(150);
    expect(result.allInclusiveCost).toBe(700);
    expect(result.totalBudget).toBeDefined();
  });
});
