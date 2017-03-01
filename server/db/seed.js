const toonAvatar = require('cartoon-avatar');
const faker = require('faker');
// faker.locale = 'zh_CN';

const selectRandom = (arr) => { return arr[Math.floor(Math.random() * arr.length)] }

const seedData = (nUsers) => {
  return {
    users: userSeedData(nUsers),
  };
}

const userSeedData = (n = 100) => {
  const users = [
    {
      username: "SpicySashimi",
      province: '山东',
      city: '青岛市',
      dob: new Date('1987-12-17'),
      email: 'lvlichaelly@gmail.com',
      password: 'Password1',
      sex: 'male',
      looking_for: 'female',
      firstname: "Mike",
      lastname: "Li",
      avatar_url: toonAvatar.generate_avatar({ gender: 'male', id: 1 }),
    },
  ];

  let user, location, contextualCard, sex, avatarUrl;
  const locations = [
    { province: '北京市', city: '朝阳区' },
    { province: '山东', city: '青岛市' },
  ]
  for (var i = 1; i < n; i++) {
    contextualCard = faker.helpers.contextualCard();
    location = selectRandom(locations);
    sex =  selectRandom(['female', 'male']);
    avatarUrl = toonAvatar.generate_avatar({ gender: sex, id: i + 1 });
    user = {
      username: contextualCard.username,
      province: location.province,
      city: location.city,
      dob: faker.date.between('1965-01-01', '1999-12-31'), // https://github.com/Marak/faker.js/wiki/Dates
      email: contextualCard.email,
      password: faker.internet.password(),
      sex: sex,
      looking_for: selectRandom(['female', 'male']),
      firstname: contextualCard.name,
      lastname: faker.name.lastName(),
      avatar_url: avatarUrl,
    }
    users.push(user);
  }
  return users;
};

module.exports = seedData;
