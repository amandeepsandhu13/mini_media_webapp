const { User } = require('../models');

const userdata = [
  {
    username: 'Bethoven',
    email:'dogs@animal.com',
    password:'fhfFf123',
    
  },
  {
    username: ' MrsJack',
    email:'cats@animal.com',
    password:'Ghhsu263'
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;