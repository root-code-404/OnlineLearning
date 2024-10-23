// authController.js (or your route handler)
const x = require('../db');
async function getUserDetails(req, res) {
    const db = await x();
    user=req.session.user
    if (req.session.user) {
     const userDetails ={
            userId:user._id,
            userName: user.name, // Set this to the user's ID after authentication
            userEmail: user.email,
            usertype: user.usertype,

          };
    
        console.log('details',userDetails)

        res.status(200).json(userDetails);
    } else {
        // No user session found
        res.status(401).json({ error: 'User not authenticated' });
    }
}

module.exports = {
    getUserDetails,
    // ... other functions like login and requireAuth
};
