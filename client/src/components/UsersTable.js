// import { useState, useEffect } from "react";
// import { BtnWrapper } from "../assets/wrappers/AdminWrapper";
// import { useAppContext } from "../context/appContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const UsersTable = () => {
//   const { globalState } = useAppContext();
//   const [users, setUsers] = useState();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const { data } = await axios.get("/admin/users");
//         setUsers(data.users);
//       } catch (error) {
//         toast.warn(error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <article>
//       <header>Existing Users</header>
//       <table>
//         <thead>
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">name</th>
//             <th scope="col">admin</th>
//             <th scope="col">actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users?.map((user, index) => {
//             return (
//               <tr key={user._id}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{user.name}</td>
//                 <td>{String(user.isAdmin)}</td>
//                 <td>
//                   <BtnWrapper>
//                     <li>
//                       <button className="contrast">Remove</button>
//                     </li>
//                     <li>
//                       <button className="contrast">Modify</button>
//                     </li>
//                   </BtnWrapper>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </article>
//   );
// };
// export default UsersTable;
