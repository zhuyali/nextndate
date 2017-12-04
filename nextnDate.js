var legalDate = function (y, m, d, isLeap) {
  if (d < 1 || m < 1 || m > 12 || y === 0) {
    return false;
  }
  var month31 = [1, 3, 5, 7, 8, 10, 12];
  var month30 = [4, 6, 9, 11];
  var result = false;
  if (month31.includes(m)) {
    result = d <= 31 ? true : false;
  } else if (month30.includes(m)) {
    result = d <= 30 ? true : false;
  } else {
    result = isLeap ? (d <= 29 ? true : false) : (d <= 28 ? true : false);
  }
  return result;
};

var nextnDate = function (y, m, d, n, flag) {
  if (y == null || m == null || d == null || n == null) return null;
  if (flag && y === 1582 && m === 10 && d >= 5 && d <= 14) return null;
  var initY = y;
  var initM = m;
  var initD = d;
  var initN = n;
  const feb = 28;
  const leapFeb = 29;
  let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  month[1] = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? leapFeb : feb;
  const isLegal = legalDate(y, m, d, month[1] === 29 ? true : false);
  if (!isLegal) return null;
  if (n >= 0) {
    while (n > month[m - 1] - d) {
      n -= month[m - 1] - d;
      d = 0;
      m++;
      if (m === 13) {
        y++;
        m = 1;
        month[1] = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? leapFeb : feb;
      }
    }
    d += n;
  } else {
    n = -n;
    while (n >= d) {
      if (m === 1) {
        m = 13;
        y--;
        month[1] = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? leapFeb : feb;
      }
      d += month[--m - 1]
    }
    d -= n;
  }

  var resultYear = parseInt(y);
  var resultMonth = parseInt(m);
  var resultDay = parseInt(d);

  if (flag) {
    if ((resultYear < 1582 && initY > 1582) || (resultYear > 1582 && y < 1582)) {
      return nextnDate(resultYear, resultMonth, resultDay, initN > 0 ? 10 : (initN === 0 ? 0 : -10), false);
    } else {
      if (resultYear === 1582) {
        if (initY < 1582) {
          if (resultMonth > 10) return nextnDate(resultYear, resultMonth, resultDay, 10, false);
          if (resultMonth === 10) return nextnDate(resultYear, resultMonth, resultDay, resultDay >= 5 ? 10 : 0, false);
        } else if (initY === 1582) {
          if ((resultMonth > 10 && initM < 10) || (resultMonth < 10 || initM > 10))
            return nextnDate(resultYear, resultMonth, resultDay, initN > 0 ? 10 : (initN === 0 ? 0 : -10), false);
          if (resultMonth === 10) {
            if (initM < 10) return nextnDate(resultYear, resultMonth, resultDay, resultDay >= 5 ? 10 : 0, false);
            else if (initM > 10) return nextnDate(resultYear, resultMonth, resultDay, resultDay <= 14 ? -10 : 0, false);
            else {
              if ((initD > 14 && resultDay <= 14) || (initD < 5 && resultDay >= 5))
                return nextnDate(resultYear, resultMonth, resultDay, initN > 0 ? 10 : (initN === 0 ? 0 : -10), false);
            }
          }
        } else {
          if (resultMonth < 10) return nextnDate(resultYear, resultMonth, resultDay, -10, false);
          if (resultMonth === 10) return nextnDate(resultYear, resultMonth, resultDay, resultDay <= 14 ? -10 : 0, false);
        }
      }
    }
  }

  if (initY > 0 && resultYear <= 0) resultYear--;
  if (initY < 0 && resultYear >= 0) resultYear++;

  return {
    year: resultYear,
    month: resultMonth,
    day: resultDay
  }
};

module.exports = nextnDate;