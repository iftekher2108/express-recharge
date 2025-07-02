const { htmlToPdf, getPage } = require("@utils/helper");
const User = require("@module/Users/Models/User");
const fs = require("fs");

// User Update
exports.userUpdate = (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;
 const user = User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // Update user details
  user.name = name;
  user.email = email;
  // Save the updated user
  user.save()
  res.json({message: "User updated successfully", user: req.user});
}


// file upload
exports.file_upload = async (req, res) => {
  res.json({ message: "file upload", file: req.file });
};


exports.dashboard = async (req, res) => {
  res.json({ message: "Welcome to the dashboard", user: req });
};


exports.pdfgenerate = async (req, res) => {
  const html = `
   <html>
      <head>
        <style>
          body { font-family: Arial; margin: 50px; }
          h1 { color: darkblue; }
        </style>
      </head>
      <body>
        <h1>Hello, PDF!</h1>
        <p>This is generated from HTML!</p>
      </body>
    </html>
  `;

  await htmlToPdf({html,res,fileName:'hell_pdf'});

};


exports.dataGet = async(req, res) => {
  const {page, browser } = await getPage('https://iftekher-mahmud.netlify.app')

const  data = await page.evaluate(() => {
   const selectData = document.querySelectorAll('.project-hover');
      const data = []
    selectData.forEach((item) => {
     const img = item.querySelector('img').src;
    const title = item.querySelector('h5').innerText;
    const content = item.querySelector('p').innerText;
    if (title && img && content) data.push({ img, title, content });
    });
    return data;
  });

  browser.close();

  res.json({data:data});

}


// exports.post = async (req, res) => {
//   res.json({ msg: "this is post page" });
// };

// // user store function
// exports.user_store = async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }

//   // res.json({name:'iftekher mahmud',param:{id:req.params.id,name:req.query.name,age:req.query.age}})
// };

// // user data get function
// exports.user_get = async (req, res) => {
//   const users = await User.findAll();
//   res.json({ users: users });
// };

// // user data delete by id function
// exports.user_delete = async (req, res) => {
//   try {
//     await User.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     res.json({ msg: `user is soft delete succesfully ${req.params.id}` });
//     // hard delete
//     //  await User.destroy({
//     //     where:{
//     //         id:req.params.id
//     //     },
//     //     force:true,
//     // })
//   } catch (error) {
//     res.status(400).json({ msg: `Something is wrong ${error}` });
//   }
// };
