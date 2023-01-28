export default function User(sequelize: any, Sequelize: any) {
  const User = sequelize.define(
    'user',
    {
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return User;
}
