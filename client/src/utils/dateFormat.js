const addDateSuffix = date => {
  let dateStr = date.toString();

  // get last char of date string
  const lastChar = dateStr.charAt(dateStr.length - 1);

  if (lastChar === '1' && dateStr !== '11') {
    dateStr = `${dateStr}st`;
  } else if (lastChar === '2' && dateStr !== '12') {
    dateStr = `${dateStr}nd`;
  } else if (lastChar === '3' && dateStr !== '13') {
    dateStr = `${dateStr}rd`;
  } else {
    dateStr = `${dateStr}th`;
  }

  return dateStr;
};

// function to format a timestamp, accepts the timestamp and an `options` object as optional parameters
module.exports = (
  timestamp,
  { monthLength = 'short', dateSuffix = true } = {}
) => {
  let months;

  if (monthLength === 'short') {
    months = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sep',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec'
    };
  } else {
    months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    };
  }

  const dateObj = new Date(timestamp);
  const formattedMonth = months[dateObj.getMonth()];

  let dayOfMonth;

  if (dateSuffix) {
    dayOfMonth = addDateSuffix(dateObj.getDate());
  } else {
    dayOfMonth = dateObj.getDate();
  }

  const year = dateObj.getFullYear();

  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year}`;

  return formattedTimeStamp;
};
