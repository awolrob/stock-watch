export const getSavedstockIds = () => {
  const savedstockIds = localStorage.getItem('saved_stocks')
    ? JSON.parse(localStorage.getItem('saved_stocks'))
    : [];

  return savedstockIds;
};

export const savestockIds = (stockIdArr) => {
  if (stockIdArr.length) {
    localStorage.setItem('saved_stocks', JSON.stringify(stockIdArr));
  } else {
    localStorage.removeItem('saved_stocks');
  }
};

export const removestockId = (stockId) => {
  const savedstockIds = localStorage.getItem('saved_stocks')
    ? JSON.parse(localStorage.getItem('saved_stocks'))
    : null;

  if (!savedstockIds) {
    return false;
  }

  const updatedSavedstockIds = savedstockIds?.filter((savedstockId) => savedstockId !== stockId);
  localStorage.setItem('saved_stocks', JSON.stringify(updatedSavedstockIds));

  return true;
};
