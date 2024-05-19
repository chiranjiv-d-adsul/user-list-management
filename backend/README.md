<!-- curl -X POST http://localhost:5000/chiru/api/${listId}/users
 \
-H "Content-Type: multipart/form-data" \
-F "file=@uploads/sample.csv"

npm install axios form-data
node uploadTest.js

http://localhost:5000/chiru/api/

{
  "subject": "Welcome to MathonGo!",
  "body": "Hey [name]!\n\nThank you for signing up with your email [email]. We have received your city as [city].\n\nTeam MathonGo."
}


// // UserList.jsx
// import React, { useEffect, useState } from 'react';
// import { getAllLists } from '../api';
// import UploadCSV from './UploadCSV';
// import EmailForm from './EmailForm';
// import UserTable from './UserTable';

// const UserList = () => {
//   const [lists, setLists] = useState([]);
//   const [selectedListId, setSelectedListId] = useState('');

//   useEffect(() => {
//     const fetchLists = async () => {
//       try {
//         const data = await getAllLists();
//         setLists(data);
//         if (data.length > 0) {
//           setSelectedListId(data[0]._id); // Set the first list as the default selected list
//         }
//       } catch (error) {
//         console.error('Error fetching user lists:', error);
//       }
//     };
//     fetchLists();
//   }, []);

//   const handleListChange = (event) => {
//     setSelectedListId(event.target.value);
//   };

//   return (
//     <div className="max-w-xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">User Lists</h2>
//       <div className="mb-4">
//         <label htmlFor="listSelect" className="block text-lg font-semibold mb-2">Select a List:</label>
//         <select
//           id="listSelect"
//           value={selectedListId}
//           onChange={handleListChange}
//           className="block w-full p-2 border border-gray-300 rounded-md"
//         >
//           {lists.map(list => (
//             <option key={list._id} value={list._id}>
//               {list.title}
//             </option>
//           ))}
//         </select>
//       </div>
//       {selectedListId && (
//         <div className="bg-gray-100 rounded-md p-4 mb-4">
//           <UploadCSV listId={selectedListId} />
//           <EmailForm listId={selectedListId} />
//           <UserTable listId={selectedListId} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserList;


// const sendEmailToList = async (req, res) => {
//   const { subject, body } = req.body;
//   const listId = req.params.listId;
//   const userList = await UserList.findById(listId).populate('users');

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const sendEmailPromises = userList.users.map(async user => {
//     let emailBody = body;
//     for (const [key, value] of user.properties) {
//       emailBody = emailBody.replace(`[${key}]`, value);
//     }
//     emailBody = emailBody.replace('[name]', user.name).replace('[email]', user.email).replace('[city]', user.city);

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject,
//       text: emailBody,
//     });
//   });

//   await Promise.all(sendEmailPromises);

//   res.send({ message: 'Emails sent successfully' });
// };

// module.exports = { sendEmailToList }; -->