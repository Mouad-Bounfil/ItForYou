const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");

const handleNewUser = async (req, res) => {
    console.log(" req.body: ", req.body)

    const { username, email, password, confirmPassword } = req.body;
    if (username === "" || email === "" || password === "" || !(password === confirmPassword && password.length >= 7)) return res.status(400).json({ 'message': 'email and password and password Confirm are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {


        //create and store the new user
        const result = await User.create({
            "email": email,
            "username": username,
            "password": password,
            "isVerified": false
        });

        console.log(result);
        // Generate an activation token for the user
        const activationToken = createActivationToken(result);
        console.log('activationToken :', activationToken);

        // Construct the activation URL
        const activationUrl = `http://localhost:3500/activate/${activationToken}`;
        console.log("Activation URL: " + activationUrl);

        // Send an activation email to the user
        try {
            await sendMail({
                email: result.email,
                subject: "Activate your account",
                message: `Hello ${result.firstName}, please click on the link to activate your account: ${activationUrl}`,
            });

            
        } catch (error) {
            // Handle email send error
            res.status(400).json({
                message: "Email not sent: " + error,
            });
        }



        res.status(201).json({ 'success': `New user ${username} created!`,message: `Please check your email (${result.email}) to activate your account Activation_url: (${activationUrl})` });
    } catch (err) {
        res.status(500).json({ 'message': "err: " + err.message });
    }
}


// create activation token
const createActivationToken = (user) => {
    try {
        const plainUser = { ...user };
        return jwt.sign(plainUser, `mouad`, {
            expiresIn: "5h",
        });

    } catch (error) {
        console.log(error)
    }

};
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json('User created successfully!');
    } catch (error) {
      next(error);
    }
  };
  
  export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };
  
  export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-4),
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };
  
  export const signOut = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  };



module.exports = { handleNewUser };