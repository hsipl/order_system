import { User } from '../entity/user';

const genUserSeed = async () => {
  const seed = {
    username: 'hsipl',
    password: '608b61a827db8e1154a9d8c4cd12e7d5',
    name: 'hsipl',
    type: 1,
  };
  const isExist = await User.findOne(seed);
  if (!isExist) {
    console.log('Staring add a admin user....');
    let user = new User();
    user = Object.assign(user, seed);
    await User.save(user);
    console.log('Create admin user success....');
  }
};

export default genUserSeed;
