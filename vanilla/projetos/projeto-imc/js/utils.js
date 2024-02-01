export function IMC(weight, height) {
  return (weight / (height / 100) ** 2).toFixed(2);
}

export function validateInputValues(values) {
  let isValid = true;

  for (let i = 0; i < values.length; i++) {
    if (isNaN(values[i]) || !values[i]) {
      isValid = false;
    }
  }

  return isValid;
}
