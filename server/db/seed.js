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

const fakeEssay = (type, length) => {
  let result = [];
  if (type == 'paragraph') {
    for (var i = 0; i < length; i++) {
      result.push(faker.lorem.paragraphs(1));
    }
    return result.join('\n\n');
  } else {
    for (var i = 0; i < length; i++) {
      result.push(faker.lorem.lines(1));
    }
    return result.join('\n');
  }
}

const usersData = (n = 100) => {
  users = users.concat([
    {
      id: 1,
      username: "SpicySashimi",
      province: 'California',
      city: 'San Francisco',
      dob: new Date('1987-12-17'),
      height: 182,
      email: 'me@gmail.com',
      password: '123',
      gender: 'male',
      looking_for: 'female',
      p_self_summary: fakeEssay('paragraph', Math.floor(Math.random() * 1) + 1),
      p_life_doing: fakeEssay('paragraph', 1),
      p_good_at: fakeEssay('line', Math.floor(Math.random() * 2) + 2),
      p_freetime_activies: fakeEssay('line', Math.floor(Math.random() * 3) + 1),
      p_important_things: fakeEssay('line', 5),
      p_thinking_about: fakeEssay('paragraph', 1),
      p_match_criteria: fakeEssay('paragraph', Math.floor(Math.random() * 1) + 1),
      avatar_url: 'https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e15/11232856_1598006027143139_1610809847_n.jpg',
      avatar_uploaded: true,
    },
    {
      id: 2,
      username: "AmberBear",
      province: 'California',
      city: 'San Francisco',
      dob: new Date('1990-01-01'),
      height: 170,
      email: 'g1@gmail.com',
      password: '123',
      gender: 'female',
      looking_for: 'male',
      education: 'Bachelor',
      industry: 'Student',
      income: 8000,
      smokes: "Doesn't smoke",
      drinks: 'Drinks socially',
      pets: 'dogs,cats',
      p_self_summary: fakeEssay('paragraph', Math.floor(Math.random() * 1) + 1),
      p_life_doing: fakeEssay('paragraph', 1),
      p_good_at: fakeEssay('line', Math.floor(Math.random() * 2) + 2),
      p_freetime_activies: fakeEssay('line', Math.floor(Math.random() * 3) + 1),
      p_important_things: fakeEssay('line', 5),
      p_thinking_about: fakeEssay('paragraph', 1),
      p_match_criteria: fakeEssay('paragraph', Math.floor(Math.random() * 1) + 1),
      avatar_url: 'http://www.animacity.ru/sites/default/files/imagecache/photo-big/users/5037/photo/2015/40/934.jpeg',
      avatar_uploaded: true,
    },
    {
      id: 3,
      username: "pineapplesauce",
      province: 'California',
      city: 'San Francisco',
      dob: new Date('1992-06-15'),
      height: 163,
      email: 'g2@gmail.com',
      password: '123',
      gender: 'female',
      looking_for: 'male',
      p_self_summary: fakeEssay('paragraph', Math.floor(Math.random() * 1) + 1),
      p_life_doing: fakeEssay('paragraph', 1),
      p_good_at: fakeEssay('line', Math.floor(Math.random() * 2) + 2),
      p_freetime_activies: fakeEssay('line', Math.floor(Math.random() * 3) + 1),
      p_important_things: fakeEssay('line', 5),
      p_thinking_about: fakeEssay('paragraph', 1),
      p_match_criteria: fakeEssay('paragraph', Math.floor(Math.random() * 1) + 1),
      avatar_url: 'http://2.bp.blogspot.com/-QmQNMHCaXHk/TfWjKkGizXI/AAAAAAAAAnY/ToDFFxjv79U/s1600/Amazing+and+Awesome+Digital+Art+Portraits+%25282%2529.jpg',
      avatar_uploaded: true,
    }
  ])

  let user, location, contextualCard, gender, looking_for, avatarUrl;
  const locations = [
    { province: 'Massachusetts', city: 'Boston' },
    { province: 'California', city: 'San Francisco' },
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
        p_self_summary: fakeEssay('paragraph', Math.floor(Math.random() * 2) + 1),
        p_life_doing: fakeEssay('paragraph', Math.floor(Math.random() * 1)),
        p_good_at: fakeEssay('line', Math.floor(Math.random() * 2)),
        p_freetime_activies: fakeEssay('line', Math.floor(Math.random() * 3)),
        p_important_things: fakeEssay('line', 5),
        p_thinking_about: fakeEssay('paragraph', Math.floor(Math.random() * 1)),
        p_match_criteria: fakeEssay('paragraph', Math.floor(Math.random() * 1)),
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
        p_self_summary: fakeEssay('paragraph', Math.floor(Math.random() * 2) + 1),
        p_life_doing: fakeEssay('paragraph', Math.floor(Math.random() * 1)),
        p_good_at: fakeEssay('line', Math.floor(Math.random() * 2)),
        p_freetime_activies: fakeEssay('line', Math.floor(Math.random() * 3)),
        p_important_things: fakeEssay('line', 5),
        p_thinking_about: fakeEssay('paragraph', Math.floor(Math.random() * 1)),
        p_match_criteria: fakeEssay('paragraph', Math.floor(Math.random() * 1)),
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
