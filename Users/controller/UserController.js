const User = require("../model/User");

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
