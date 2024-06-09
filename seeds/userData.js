const { User } = require('../models');

const userdata = [
  {
    
    email:'dogs@animal.com',
    username: 'Bethoven',
    password:'fhfFf123',
    name:'Beth',
    DOB:'06/07/2021',
    gender:'male',
    bio:'love my toys',
    dateCreated:'06/07/2024',

  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;