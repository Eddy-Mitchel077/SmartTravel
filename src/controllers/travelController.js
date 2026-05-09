const { calculateBudget } = require('../services/budgetService');

function computeTravelBudget(req, res) {
  const { destination, hotel, days, persons, children, pension, bookingDate } = req.body;

  if (!destination || !hotel || !days || !persons || !bookingDate) {
    return res.status(400).json({ error: 'Paramètres manquants' });
  }

  const result = calculateBudget({ destination, hotel, days, persons, children, pension, bookingDate });

  return res.status(200).json({
    destination,
    hotel,
    days,
    persons,
    children,
    pension,
    bookingDate,
    ...result
  });
}

module.exports = { computeTravelBudget };
