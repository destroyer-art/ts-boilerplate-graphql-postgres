export default function User(sequelize: any, Sequelize: any) {
  const User = sequelize.define('user', {
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });
  return User;
}
