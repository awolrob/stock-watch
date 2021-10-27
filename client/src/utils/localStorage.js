export const getSavedStockIds = () => {
  const savedStockIds = localStorage.getItem('saved_stocks')
    ? JSON.parse(localStorage.getItem('saved_stocks'))
    : [];

  return savedStockIds;
};

export const saveStockIds = (stockIdArr) => {
  if (stockIdArr.length) {
    localStorage.setItem('saved_stocks', JSON.stringify(stockIdArr));
  } else {
    localStorage.removeItem('saved_stocks');
  }
};

export const removeStockId = (stockId) => {
  const savedStockIds = localStorage.getItem('saved_stocks')
    ? JSON.parse(localStorage.getItem('saved_stocks'))
    : null;

  if (!savedStockIds) {
    return false;
  }

  const updatedSavedStockIds = savedStockIds?.filter((savedStockId) => savedStockId !== stockId);
  localStorage.setItem('saved_stocks', JSON.stringify(updatedSavedStockIds));

  return true;
};