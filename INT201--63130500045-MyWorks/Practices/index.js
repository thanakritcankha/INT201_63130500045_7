function howManydays(month) {
  var days;
  switch (month) {
    case 2: return 28
    case 4:
    case 6:
    case 9:
    case 11: return 30
  }
  return 31;
}

month = 5;
return month;