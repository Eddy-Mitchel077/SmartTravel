const express = require('express');
const app = express();
app.use(express.json());

// POST /api/travel-budget
app.post('/api/travel-budget', (req, res) => {
  var d = req.body.destination;
  var h = req.body.hotel;
  var j = req.body.days;
  var p = req.body.persons;
  var e = req.body.children;
  var pension = req.body.pension;
  var dateResa = req.body.bookingDate;

  var vol = 0;
  var total = 0;
  var prixHotel = 0;

  if (d == 'Asie') {
    vol = 800;
  } else {
    vol = 300;
  }

  if (h == 'luxe') {
    prixHotel = 200;
  } else if (h == 'standard') {
    prixHotel = 100;
  } else if (h == 'budget') {
    prixHotel = 50;
  } else {
    prixHotel = 100;
  }

  if (e == true) {
    prixHotel = prixHotel * 1.5;
  }

  var allInclusive = 0;
  if (pension == 'all-inclusive') {
    allInclusive = 50 * j * p;
  }

  total = vol + (prixHotel * j) + allInclusive;

  var today = new Date();
  var booking = new Date(dateResa);
  var diffMs = booking - today;
  var diffMonths = diffMs / (1000 * 60 * 60 * 24 * 30);
  if (diffMonths > 6) {
    total = total - (total * 0.15);
  }

  res.json({
    destination: d,
    hotel: h,
    days: j,
    persons: p,
    children: e,
    pension: pension,
    bookingDate: dateResa,
    vol: vol,
    hotelPrice: prixHotel,
    allInclusiveCost: allInclusive,
    totalBudget: total
  });
});

app.listen(3000, () => {
  console.log('SmartTravel API running on port 3000');
});

module.exports = app;
