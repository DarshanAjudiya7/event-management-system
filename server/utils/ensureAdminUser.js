const User = require('../models/User');

const ensureAdminUser = async () => {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    console.log('Admin bootstrap skipped. Set ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD to enable it.');
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  let adminUser = await User.findOne({ email: normalizedEmail });

  if (!adminUser) {
    await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: 'admin'
    });
    console.log(`Admin user created for ${normalizedEmail}`);
    return;
  }

  let shouldSave = false;

  if (adminUser.role !== 'admin') {
    adminUser.role = 'admin';
    shouldSave = true;
  }

  if (adminUser.name !== name.trim()) {
    adminUser.name = name.trim();
    shouldSave = true;
  }

  const passwordMatches = await adminUser.comparePassword(password);
  if (!passwordMatches) {
    adminUser.password = password;
    shouldSave = true;
  }

  if (shouldSave) {
    await adminUser.save();
    console.log(`Admin user synchronized for ${normalizedEmail}`);
  } else {
    console.log(`Admin user already configured for ${normalizedEmail}`);
  }
};

module.exports = ensureAdminUser;
