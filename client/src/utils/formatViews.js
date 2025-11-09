const formatViews = (num) => new Intl.NumberFormat('en',{
    notation: "compact",
    maximumFractionDigits: 1,
}).format(num);

export default formatViews;