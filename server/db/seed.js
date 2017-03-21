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

let users = [];

const usersData = (n = 100) => {
  users = users.concat([
    {
      id: 1,
      username: "SpicySashimi",
      province: '山东',
      city: '青岛市',
      dob: new Date('1987-12-17'),
      height: 182,
      email: 'me@gmail.com',
      password: '123',
      gender: 'male',
      looking_for: 'female',
      firstname: "Mike",
      lastname: "Li",
      avatar_url: 'https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e15/11232856_1598006027143139_1610809847_n.jpg',
      avatar_uploaded: true,
    },
    {
      id: 2,
      username: "AmberBear",
      province: '山东',
      city: '青岛市',
      dob: new Date('1990-01-01'),
      height: 170,
      email: 'g1@gmail.com',
      password: '123',
      gender: 'female',
      looking_for: 'male',
      firstname: "Amber",
      lastname: "Kim",
      avatar_url: 'http://www.animacity.ru/sites/default/files/imagecache/photo-big/users/5037/photo/2015/40/934.jpeg',
      avatar_uploaded: true,
    },
    {
      id: 3,
      username: "pineapplesauce",
      province: '山东',
      city: '青岛市',
      dob: new Date('1992-06-15'),
      height: 163,
      email: 'g2@gmail.com',
      password: '123',
      gender: 'female',
      looking_for: 'male',
      firstname: "Becca",
      lastname: "Volkova",
      avatar_url: 'http://2.bp.blogspot.com/-QmQNMHCaXHk/TfWjKkGizXI/AAAAAAAAAnY/ToDFFxjv79U/s1600/Amazing+and+Awesome+Digital+Art+Portraits+%25282%2529.jpg',
      avatar_uploaded: true,
    }
  ])

  let user, location, contextualCard, gender, looking_for, avatarUrl;
  const locations = [
    { province: '北京市', city: '朝阳区' },
    { province: '山东', city: '青岛市' },
  ]
  for (var i = 3; i < n; i++) {
    contextualCard = faker.helpers.contextualCard();
    location = selectRandom(locations);
    [gender, looking_for] =  selectRandom([['female', 'male'], ['male', 'female']]);
    avatarUrl = toonAvatar.generate_avatar({ gender: gender, id: i + 1 });
    if (Math.random() > 0.15) {
      user = {
        id: i + 1,
        username: contextualCard.username,
        province: location.province,
        city: location.city,
        dob: faker.date.between('1965-01-01', '1999-12-31'), // https://github.com/Marak/faker.js/wiki/Dates
        height: Math.floor(Math.random() * 35 + 150),
        email: contextualCard.email,
        password: faker.internet.password(),
        gender: gender,
        looking_for: looking_for,
        firstname: contextualCard.name,
        lastname: faker.name.lastName(),
        avatar_url: avatarUrl,
        avatar_uploaded: true,
      }
    } else { // 15% users will have no avatar uploaded, no height, no frist and last name
      user = {
        id: i + 1,
        username: contextualCard.username,
        province: location.province,
        city: location.city,
        dob: faker.date.between('1965-01-01', '1999-12-31'), // https://github.com/Marak/faker.js/wiki/Dates
        email: contextualCard.email,
        password: faker.internet.password(),
        gender: gender,
        looking_for: looking_for,
      }
    }
    users.push(user);
  }
  return users;
};

const likesData = () => {
  const likedUsers = [];
  for (var i = 0; i < users.length; i++) { // creates 6 liked users
    if (likedUsers.length < 6 && users[i].gender === 'female') {
      likedUsers.push(users[i]);
    }
  }
  return likedUsers.map((u)  => {
    return { interested_user_id: 1, liked_user_id: u.id }
  });
}

module.exports = seedData;
