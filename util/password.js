export function getStrength(pw) {
  if (!pw) {
    return 0;
  }

  const minLength = pw.length >= 8;
  const numberRegex = /\d/;
  const englishRegex = /[A-Za-z]/;
  const strongLength = pw.length >= 12;
  const specialCharRegex = /[^A-Za-z0-9\s]/;

  if (!(minLength && numberRegex.test(pw) && englishRegex.test(pw))) {
    return 1;
  }

  if (strongLength || specialCharRegex.test(pw)) {
    return 3;
  }

  return 2;
}
