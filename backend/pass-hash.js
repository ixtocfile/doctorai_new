const bcrypt = require('bcrypt');
//hash un mdp
async function hashPassword() {
  const myPassword = 'admin123202';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();