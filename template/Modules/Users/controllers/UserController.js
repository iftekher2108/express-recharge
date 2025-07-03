const { htmlToPdf, getPage } = require("@utils/helper");
const User = require("@module/Users/Models/User");
const fs = require("fs");




//! ======================= user data get =========================================

// exports.userGet = async (req, res) => {
//   const users = await User.findAll();
//   res.json({ users: users });
// };

//! ======================= user data get =========================================


//! ======================= user data Store =========================================

// exports.userStore = async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// // res.json({name:'iftekher mahmud',param:{id:req.params.id,name:req.query.name,age:req.query.age}})
// };

//! ======================= user data Store =========================================



//! ======================= user Update =========================================

// exports.userUpdate = (req, res) => {
//   const userId = req.user.id;
//   const { name, email } = req.body;
//   const user = User.findByPk(userId);
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }
//   // Update user details
//   user.name = name;
//   user.email = email;
//   // Save the updated user
//   user.save();
//   res.json({ message: "User updated successfully", user: req.user });
// };

//! ======================= user Update =========================================



//! ======================= user data delete =========================================

// exports.userDelete = async (req, res) => {
//   try {
//     await User.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     res.json({ msg: `user is soft delete succesfully ${req.params.id}` });

// if use soft and want to permanently delete
//  await User.destroy({
//     where:{
//         id:req.params.id
//     },
//     force:true,
// })
//  res.json({ msg: `user is permanently delete succesfully ${req.params.id}` });

//   } catch (error) {
//     res.status(400).json({ msg: `Something is wrong ${error}` });
//   }
// };

//! ======================= user data delete =========================================



//? ========================== sample logics =======================================


//! ======================= File Upload =========================================

// exports.fileUpload = async (req, res) => {
//   res.json({ message: "file upload", file: req.file });
// };

//! ======================= File Upload =========================================


//! ======================= PDF generate =========================================

// exports.pdfGenerate = async (req, res) => {
//   const html = `
//    <html>
//       <head>
//         <style>
//           body { font-family: Arial; margin: 50px; }
//           h1 { color: darkblue; }
//         </style>
//       </head>
//       <body>
//         <h1>Hi, IFTEKHER!</h1>
//         <p>This is generated from HTML for PDF!</p>
//       </body>
//     </html>
//   `;

//   await htmlToPdf({ html, res, fileName: "hi_pdf" });
// };

//! ======================= PDF generate =========================================


//! ======================= web scrape data =========================================

// exports.scrapeDataGet = async (req, res) => {
//   const { page, browser } = await getPage(
//     "https://iftekher-mahmud.netlify.app/project"
//   );

//   const data = await page.evaluate(() => {
//     //
//     const selectData = document.querySelectorAll(".project-hover");
//     const data = [];
//     selectData.forEach((item) => {
//       const img = item.querySelector("img").src;
//       const title = item.querySelector("h5").innerText;
//       const content = item.querySelector("p").innerText;
//       if (title && img && content) data.push({ img, title, content });
//     });
//     return data;
//   });

//   await browser.close();

//   res.json({ data: data, dataLength: data.length });
// };

//! ======================= web scrape data =========================================
