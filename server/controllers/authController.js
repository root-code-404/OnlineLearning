// // authController.js

// const x = require('../db');



// async function login(req, res) {
//   try {
//     const { email, pass, usertype } = req.body;
//     const db = await x();
//     const collection = db.collection('instructor');
//     const user1 = await collection.findOne({ email, pass, usertype :1});
//     const user2 = await collection.findOne({ email, pass, usertype :0});

//     console.log(user1)
//     console.log(user2)
//     const user = {
//       userType0: user1,
//       userType1: user2,
//     };
//     if (user) {
//       if (usertype === 1) {
//         res.status(201).json({ user, usertype: 'user'});
//       } else if (usertype === 0) {
//         res.status(201).json({ user, usertype: 'instructor' });
//       }
//     } else {
//       res.status(401).json({ error: 'Login failed' });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// //     if (user) {
// //       res.status(201).json({ user, usertype: user.usertype });
// //     } else {
// //       res.status(401).json({ error: 'Login failed' });
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // }


// module.exports = {
//   login,
// };


const x = require('../db');

async function login(req, res) {
  try {
    const { email, pass, usertype } = req.body;
    const db = await x();
    const collection = db.collection('instructor');
    const user1 = await collection.findOne({ email, pass, usertype: 1 });
    const user0 = await collection.findOne({ email, pass, usertype: 0 }); // Check for usertype 0

    if (user1) {
      req.session.user = user1;
      req.session.usertype = 'user'
      res.status(201).json({ user: user1, usertype: 'user' });
    } else if (user0) {
      req.session.user = user0;
      req.session.usertype = 'instructor';
      res.status(201).json({ user: user0, usertype: 'instructor' });
    } else {
      res.status(401).json({ error: 'Login failed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
function requireAuth(req, res, next) {
  if (req.session.user) {
    // User is authenticated
    return next();
  }
  res.redirect('/login'); // Redirect to the login page if not authenticated
}

module.exports = {
  requireAuth,
};

module.exports = {
  login,
};
