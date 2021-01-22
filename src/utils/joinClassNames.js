const joinClassNames = ({ basicClasses = [], conditionClasses = {} }) => {
  const condition = Object.keys(conditionClasses).length > 0
    ? Object.keys(conditionClasses).map((key) => {
      if (key.trim()) {
        if (conditionClasses[key]) {
          return key;
        }
      }
      return '';
    })
    : [];

    return [...basicClasses, ...condition].filter((el) => {
      if (el) {
        return Boolean(el.trim()); 
      }
  }).join(' ');
};

export default joinClassNames;
