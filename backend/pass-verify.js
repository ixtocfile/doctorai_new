const bcrypt = require('bcrypt');
// verify password
async function verifyPassword(){
    const myPassword='admin123202';
    const hash='$2b$10$cgX.HeN.rbxU6zS/KCmuiObM54Gf/vo0GLHSbv6apW6QWRigxjPEm';
    const isMatch = await bcrypt.compare(myPassword,hash);
    console.log(isMatch);
}

verifyPassword();