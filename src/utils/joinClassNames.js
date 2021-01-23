const joinClassNames = ({ basic = [], condition = {} }) => {
  const conditionArr = Object.keys(condition).length > 0
    ? Object.keys(condition).map((key) => {
      if (key.trim()) {
        if (condition[key]) {
          return key;
        }
      }
      return '';
    })
    : [];

    return [...basic, ...conditionArr].filter((el) => {
      if (el) {
        return Boolean(el.trim()); 
      }
  }).join(' ');
};

export default joinClassNames;
