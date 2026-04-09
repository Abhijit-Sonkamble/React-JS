import { useEffect, useState } from "react"

export default function Table() {

    const [allAdmin, setAllAdmin] = useState<any[]>([]);

    useEffect(() => {
        const data = [{
            name:"Abhijit",
            email: "abhijitsonkamble@gmail.com",
            phone: "1234567890",
            isActive: true

        },
        {
            name:"Abhishek",
            email: "abhishek@gmail.com",
            phone: "1234567890",
            isActive: false
        }]
        setAllAdmin(data)
    }, [])


  return (


    <>
      <table border={1} cellPadding="10" cellSpacing="0" style={{ width: "50%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
         {
            allAdmin.map((admin, index) => {
                return (
                <tr key={index}>
            <td>{index + 1}</td>
            <td>{admin.name}</td>
            <td>{admin.email}</td>
            <td>{admin.phone}</td>
            <td>{admin.isActive ? "Active" : "Inactive"}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
                )
            })
         }
        </tbody>
      </table>
    </>
  );
}