import React, { useEffect, useState } from "react";

const Showuser = () => {
    const [UserAccount, setUserAccount] = useState([]);

 useEffect(() => {
   const fetchUsers = async () => {
     try {
       const Response = await fetch(
         "https://67040b1dab8a8f892732bba2.mockapi.io/Aptify/user"
       );
       if (Response.status === 200) {
         const user_Data = await Response.json();

         setUserAccount(user_Data);
       }
     } catch (error) {
       console.log(error);
     }
   };

   fetchUsers();
 }, [UserAccount]);
    
  
    return (
      <>
        <div className="container mt-4">
          <h2 className="text-center fw-bold co mt-4">
            <u> User Account List </u>
          </h2>

          <table className="table  table-bordered mt-4 shadow-lg">
            <thead>
              <tr className="table-success ">
                <th style={{ color: "#13547a" }} scope="col ">
                  #
                </th>
                <th style={{ color: "#13547a" }} scope="col">
                  User Name
                </th>
                <th style={{ color: "#13547a" }} scope="col">
                  User Cnic
                </th>
                <th style={{ color: "#13547a" }} scope="col">
                  User Email
                </th>
                <th style={{ color: "#13547a" }} scope="col">
                  User Contact
                </th>
              </tr>
            </thead>
            <tbody>
              {UserAccount.map((user, index) => {
                return (
                  <>
                    <tr key={index}>
                      <th style={{ color: "#13547a" }} scope="row">
                        {user.id}
                      </th>
                      <td
                        className="text-capitalize"
                        style={{ color: "#13547a" }}
                      >
                        {user.name}
                      </td>
                      <td style={{ color: "#13547a" }}>{user.cnic}</td>
                      <td style={{ color: "#13547a" }}>{user.email}</td>
                      <td style={{ color: "#13547a" }}>{user.contact}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
      </>
    );
};

export default Showuser;
