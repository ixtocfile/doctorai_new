const bcrypt = require('bcrypt');
//pour tester un hash password
const plainPassword = "Pass4admin";
const storedHashedPassword = "$2b$10$HbhxB0mB7GuL.a3QjIZoNO74xtO4J0D7wE.wcgjSVId5buvYq7D4q"; // Replace this with your stored hash

bcrypt.compare(plainPassword, storedHashedPassword, (err, result) => {
    if (err) {
        console.error("Error comparing passwords:", err);
    } else {
        console.log("Password match:", result); // true if match, false otherwise
    }
});
