var nextnDate = function (y, m, d, n) {
  const feb = 28;
  const leapFeb = 29;
  let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  month[1] = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? leapFeb : feb;
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
      d += month[--m-1]
    }
    d -= n;
  }

  return {
    year: parseInt(y),
    month: parseInt(m),
    day: parseInt(d)
  }
}

module.exports = nextnDate;
