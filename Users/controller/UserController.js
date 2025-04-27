const bcrypt = require('bcryptjs');
const { generateToken } = require('../../utils/jwt');
const User = require('../model/User');


exports.register = async(req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token for the user
    const token = generateToken(user);

    // Respond with the token and user data (you can choose what to send back)
    res.status(201).json({ token, user: { id: user.id,name:user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error',error:err });
  }
}


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = generateToken(user); // Create JWT token
    res.json({ token, user: { id: user.id,name:user.name, email: user.email } }); // Send token back to the client
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

exports.logout = async(req,res) => {


  res.json({msg:'logout successfully!'})
}


exports.dashboard = async(req,res) => {
  res.json({msg: 'Welcome to the dashboard',user:req})
}

exports.post = async(req,res) => {
  res.json({msg: 'this is post page'})
}


exports.user_store = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  // res.json({name:'iftekher mahmud',param:{id:req.params.id,name:req.query.name,age:req.query.age}})
};


exports.user_get = async (req, res) => {
  const users = await User.findAll();
  res.json({ users: users });
};

exports.user_list = async(req, res) =>{
  const users = await User.findAll();
  res.json({users:users})
}


exports.one_milion = async(req, res) => {
  for (let index = 0; index < 500000; index++) {
    await User.create({name:req.body.name+`${index}`,password:req.body.password+`${index}`})
  }
  res.json({msg:'five milion row insert succesfully'})
  
}

exports.one_hundred = async(req, res) => {
  for (let index = 0; index < 100; index++) {
    await User.create({name:req.body.name+`${index}`,password:req.body.password+`${index}`})
  }
  res.json({msg:'one hundred row insert succesfully'})
}

exports.user_delete = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({ msg: `user is soft delete succesfully ${req.params.id}` });
    // hard delete
    //  await User.destroy({
    //     where:{
    //         id:req.params.id
    //     },
    //     force:true,
    // })
    
  } catch (error) {
    res.status(400).json({ msg: `Something is wrong ${error}` });
  }
};
