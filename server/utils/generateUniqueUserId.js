const generateUniqueUserId = (num) => {
  const months = [
    "JAN","FEB","MAR","APR","MAY","JUN",
    "JUL","AUG","SEP","OCT","NOV","DEC"
  ];
  const now = new Date();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  return `USR-${month}${year}-${num}`;
};

export default generateUniqueUserId;