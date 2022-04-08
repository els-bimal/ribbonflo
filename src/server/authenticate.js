import uuid from 'uuid';
import md5 from 'md5';
import { connectDB } from './connect-db';
import { assembleUserState } from './utility';
import genarate from './passwordGenerator';
import sendMail from './sendMail';
const authenticationTokens = [];

export const authenticationRoute = app => {
  app.post('/authenticate', async (req, res) => {
    let { username, password } = req.body;
    let db = await connectDB();
    let collection = db.collection(`users`);

    let user = await collection.findOne({ username: username });
    if (!user) {
      return res.status(499).send(`User not found or password incorreect`);
    }
    console.log('-assword-');
    console.log(password);
    console.log('-password-');
    let hash = md5(password);
    let passwordCorrect = hash === user.passwordHash;
    if (!passwordCorrect) {
      return res.status(499).send('User not found or password incorreect');
    }

    let token = uuid();

    authenticationTokens.push({
      token,
      userID: user.id,
    });

    let result = await collection.updateOne(
      { username: username },
      {
        $set: { 
          'session.lastDateTimeAccessed': getCurrentDate(), 
          'session.lastModuleAccessed': 'Login'
        }
      }, 
      false,
      true
    )

    let state = await assembleUserState(user);

    res.send({ token, state });
  });


  app.post('/forgetpassword', async (req, res) => {
    let { username } = req.body;
    let db = await connectDB();
    let collection = db.collection(`users`);
    let password = genarate(10, true);
    let hash = md5(password);
    let user = await collection.findOne({ username: username });
    if (!user) {
      return res.status(499).send(`No such user found`);
    }
    let result = await collection.updateOne(
      { username: username },
      {
        $set: { 
          resetPassword: true, 
          passwordHash: hash, 
          'session.lastDateTimeAccessed': getCurrentDate(), 
          'session.lastModuleAccessed': 'Forget Password'
        }
      }, 
      false,
      true
    )

    if(result.modifiedCount === 1){
      let senderOptions = {
        to : user.emailAddress,
        subject : "RibbonFlo Password Reset Request",
        html : "<div><h1>RiibonFlo Password Reset</h1><p>Your temporary password : " + password + "</p><div>"
      }
      sendMail(senderOptions);
      res.send({ success: "Ok" });
    }
    else{
      return res.status(500).send(`Some error while handling the request`);
    }
  });

  app.post('/setpassword', async (req, res) => {
    let { username, password, newpassword } = req.body;
    let db = await connectDB();
    let collection = db.collection(`users`);

    let user = await collection.findOne({ username: username });
    if (!user) {
      return res.status(499).send(`User not found or password incorreect`);
    }
    console.log('-assword-');
    console.log(password);
    console.log('-password-');
    let hash = md5(password);
    let passwordCorrect = hash === user.passwordHash;
    if (!passwordCorrect) {
      return res.status(499).send('User not found or password incorreect');
    }
    let hash2 = md5(newpassword);
    user.resetPassword = false;
    let result = await collection.updateOne(
      { username: username },
      {
        $set: { 
          resetPassword: user.resetPassword, 
          passwordHash: hash2,
          'session.lastDateTimeAccessed': getCurrentDate(), 
          'session.lastModuleAccessed': 'Forget Password'
        }
      }, 
      false,
      true
    )
    if(result.modifiedCount === 1){
      let senderOptions = {
        to : user.emailAddress,
        subject : "RibbonFlo Password Changed",
        html : "<div><h1>RiibonFlo Password Changed</h1><p>You have successfully chaged password</p><div>"
      }
      sendMail(senderOptions);
    }
    else{
      return res.status(500).send(`Some error while handling the request`);
    }
    let token = uuid();

    authenticationTokens.push({
      token,
      userID: user.id,
    });
    console.log('[------]')
    console.log(user);
    let state = {session : {}, users: [user]};
    console.log('[------]')
    console.log(state);

    res.send({ token, state });

  });




  app.post('/user/create', async (req, res) => {
    let {
      username,
      password,
      firstName,
      lastName,
      contactNumber,
      emailAddress,
      roleId,
      resetPassword,
      active,
      homeStore,
      dateJoined,
    } = req.body;
    console.log(username, password);
    let db = await connectDB();
    let collection = db.collection(`users`);
    let user = await collection.findOne({ name: username });
    if (user) {
      res.status(500).send({ message: 'A user with that account name already exists.' });
      return;
    }

    let userID = uuid();
    let groupID = uuid();

    await collection.insertOne({
      name: username,
      id: userID,
      passwordHash: md5(password),
      firstName,
      lastName,
      contactNumber,
      emailAddress,
      roleId,
      resetPassword,
      active,
      homeStore,
      dateJoined,
      session: {
        lastDateTimeAccessed : getCurrentDate(),
        lastModuleAccessed: 'Create User'
      }
    });

    let state = await assembleUserState({ id: userID, username: username });

    res.status(200).send({ userID, state });
  });
};
function getCurrentDate(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var hrs = String(today.getHours()).padStart(2, '0');
  var min = String(today.getMinutes()).padStart(2, '0');
  var sec = String(today.getSeconds()).padStart(2, '0');

  var now = yyyy + '-' + mm + '-' + dd + 'T' + hrs + ':' + min + ':' + sec + 'Z'; 
  return new Date(now);
};