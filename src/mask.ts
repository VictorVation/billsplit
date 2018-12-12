export default function mask(
  value: number,
  decimalSeparator: string = ".",
  thousandSeparator: string = ",",
  prefix: string = "$"
): { value: number; maskedValue: string } {
  const PRECISION = 2;
  const MAX_DIGITS = 6 + 2;

  if (value == null) {
    return { value: 0, maskedValue: `${prefix}0.00` };
  }

  // if the given value is a Number, let's convert into String to manipulate that
  const stringVal = String(value);

  if (stringVal.length === 0) {
    return { value: 0, maskedValue: `${prefix}0.00` };
  }

  // extract digits. if no digits, fill in a zero.
  let digits = stringVal.match(/\d/g) || ["0"];

  if (stringVal.length > MAX_DIGITS) {
    digits.pop();
  }

  // zero-pad a input
  while (digits.length <= PRECISION) {
    digits.unshift("0");
  }

  // add the decimal separator
  digits.splice(digits.length - PRECISION, 0, ".");

  // clean up extraneous digits like leading zeros.
  digits = Number(digits.join(""))
    .toFixed(PRECISION)
    .split("");
  let raw = Number(digits.join(""));

  // -1 needed to position the decimal separator before the digits.
  let decimalpos = digits.length - PRECISION - 1;

  // set the final decimal separator
  digits[decimalpos] = decimalSeparator;

  // add in any thousand separators
  for (let x = decimalpos - 3; x > 0; x = x - 3) {
    digits.splice(x, 0, thousandSeparator);
  }

  // if we have a prefix or suffix, add them in.
  if (prefix.length > 0) {
    digits.unshift(prefix);
  }

  return { value: raw, maskedValue: digits.join("").trim() };
}
