const AddPoints = (point: number) => {
  const _pointRegex = /(\d)(?=(?:\d{3})+(?!\d))/g;
  return point.toString().replace(_pointRegex, '$1,');
};

const SplitCard = (cardNumber: string) => {
  const regexPattern = /[\d*]{4}(?=[\d*])/g;
  const result = cardNumber.replace(regexPattern, '$& ');

  return result;
};

export {AddPoints, SplitCard};
