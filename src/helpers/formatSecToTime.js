const lessThanTenMod = num => ('0' + num).slice(-2);

export const formatSecToTime = sec => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec - m * 60);
  return lessThanTenMod(m) + ":" + lessThanTenMod(s);
}

