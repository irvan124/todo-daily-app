const dateFormat = (date) => {
  let d = new Date(date);

  let getYear = d.getUTCFullYear();
  let getMonth = d.getUTCMonth();
  let getDate = d.getUTCDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dateFormated = `${getDate} ${monthNames[getMonth]} ${getYear}`;
  return dateFormated;
};

export default dateFormat;
