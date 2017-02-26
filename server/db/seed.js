const faker = require('faker');
// faker.locale = 'zh_CN';

const selectRandom = (arr) => { return arr[Math.floor(Math.random() * arr.length)] }

const seedData = (numberUsers = 100) => {
  const data = {
    users: [],
  };

  let user;
  let location;
  const locations = [
    { province: '北京市', city: '朝阳区' },
    { province: '山东', city: '青岛市' },
  ]
  for (var i = 0; i < numberUsers; i++) {
    location = selectRandom(locations);
    user = {
      dob: faker.date.between('1965-01-01', '1999-12-31'), // https://github.com/Marak/faker.js/wiki/Dates
      email: faker.internet.email(),
      password: faker.internet.password(),
      sex: selectRandom(['female', 'male']),
      lookingFor: selectRandom(['female', 'male']),
      province: location.province,
      city: location.city,
    }
    data.users.push(user);
  }

  return data
}

module.exports = seedData;
