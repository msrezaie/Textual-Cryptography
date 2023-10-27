const User = require("../models/User");

const generateAdmins = async () => {
  const adminValues = [
    {
      email: process.env.ROOT_ADMIN_EMAIL,
      password: process.env.ROOT_ADMIN_PASSWORD,
      role: "root-admin",
    },
    {
      email: process.env.READ_ADMIN_EMAIL,
      password: process.env.READ_ADMIN_PASSWORD,
      role: "read-only-admin",
    },
  ];

  try {
    const rootAdminExists = await User.findOne({
      email: {
        $in: [adminValues[0].email],
      },
    });
    if (!rootAdminExists) {
      for (let admin of adminValues) {
        await User(admin).save();
      }
      console.log("Admin roles generated!");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = generateAdmins;
