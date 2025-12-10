function isValidOrderAmount(amount) {
  if (typeof amount !== 'number') return false;
  return amount > 0;
}

function calculateDiscount(total, discountPercent) {
    return total - (total * (discountPercent / 100));
}

module.exports = { isValidOrderAmount, calculateDiscount };