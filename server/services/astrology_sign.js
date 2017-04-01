module.exports = (date) => {
  let value;
  var month = date.getMonth();
  var day = date.getDate();
  if (month == 1 && day >=20 || month == 2 && day <=18) {value = "Aquarius";}
  if (month == 2 && day >=19 || month == 3 && day <=20) {value = "Pisces";}
  if (month == 3 && day >=21 || month == 4 && day <=19) {value = "Aries";}
  if (month == 4 && day >=20 || month == 5 && day <=20) {value = "Taurus";}
  if (month == 5 && day >=21 || month == 6 && day <=21) {value = "Gemini";}
  if (month == 6 && day >=22 || month == 7 && day <=22) {value = "Cancer";}
  if (month == 7 && day >=23 || month == 8 && day <=22) {value = "Leo";}
  if (month == 8 && day >=23 || month == 9 && day <=22) {value = "Virgo";}
  if (month == 9 && day >=23 || month == 10 && day <=22) {value = "Libra";}
  if (month == 10 && day >=23 || month == 11 && day <=21) {value = "Scorpio";}
  if (month == 11 && day >=22 || month == 12 && day <=21) {value = "Sagittarius";}
  if (month == 12 && day >=22 || month == 1 && day <=19) {value = "Capricorn";}
  return value;
};
