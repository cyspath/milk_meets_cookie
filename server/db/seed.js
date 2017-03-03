const toonAvatar = require('cartoon-avatar');
const faker = require('faker');
// faker.locale = 'zh_CN';

const selectRandom = (arr) => { return arr[Math.floor(Math.random() * arr.length)] }

const seedData = (nUsers) => {
  return {
    users: usersData(nUsers),
    likes: likesData(),
  };
}

const users = [];

const usersData = (n = 100) => {
  users.push({
    id: 1,
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
  })

  let user, location, contextualCard, sex, looking_for, avatarUrl;
  const locations = [
    { province: '北京市', city: '朝阳区' },
    { province: '山东', city: '青岛市' },
  ]
  for (var i = 1; i < n; i++) {
    contextualCard = faker.helpers.contextualCard();
    location = selectRandom(locations);
    [sex, looking_for] =  selectRandom([['female', 'male'], ['male', 'female']]);
    avatarUrl = toonAvatar.generate_avatar({ gender: sex, id: i + 1 });
    user = {
      id: i + 1,
      username: contextualCard.username,
      province: location.province,
      city: location.city,
      dob: faker.date.between('1965-01-01', '1999-12-31'), // https://github.com/Marak/faker.js/wiki/Dates
      email: contextualCard.email,
      password: faker.internet.password(),
      sex: sex,
      looking_for: looking_for,
      firstname: contextualCard.name,
      lastname: faker.name.lastName(),
      avatar_url: avatarUrl,
    }
    users.push(user);
  }
  return users;
};

const likesData = () => {
  const likedUsers = [];
  for (var i = 0; i < users.length; i++) { // creates 6 liked users
    if (likedUsers.length < 6 && users[i].sex === 'female') {
      likedUsers.push(users[i]);
    }
  }
  return likedUsers.map((u)  => {
    return { interested_user_id: 1, liked_user_id: u.id }
  });
}

module.exports = seedData;
