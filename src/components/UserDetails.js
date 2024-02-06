import { db, auth } from "../firebase";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const UserDetails = ({isAuth}) => {
  const [userList, setUserList] = useState([]);
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [refresh,setRefresh]=useState("");
  const userDataBaseRef = collection(db, "user_details");

  const getUserData = async () => {
    try {
      const data = await getDocs(userDataBaseRef);
      console.log(data);
      let filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      filteredData = filteredData.filter((user) => user.userId === auth.currentUser.uid);
      console.log(filteredData)
      setUserList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  
  useEffect(() => {
    getUserData();
  },[refresh]);

  const addUser = async () => {
    try {
      await addDoc(userDataBaseRef, {
        Name: newName,
        date: newDate,
        status: newStatus,
        userId: auth?.currentUser?.uid,
      });
      setNewName("");
      setNewDate("")
      setNewStatus("")
      setRefresh('added')
    } catch (err) {
      console.error(err);
    }
  };

  const updateCurrentUser = async (stat, id) => {
    const userDoc = doc(db, "user_details", id);
    try{
      if(stat==="online"){
        await updateDoc(userDoc, { status: "offline" });
        setRefresh("yes")
        
      }else{
        await updateDoc(userDoc, { status: "online" });
        setRefresh("yesyes")
      }
    }catch(err){
      console.error(err);
    }
    
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "user_details", id);
    try {
      await deleteDoc(userDoc);
      setRefresh("deleted")
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <div className="p-5 h-screen bg-gray-100">
      {!isAuth && <div>Please login to see the User Details Table</div>}
      {isAuth && (
        <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th  className="bg-blue-600 text-white px-3 py-2 rounded-xl text-center">Name</th>
            <th  className="bg-blue-600 text-white px-3 py-2 rounded-xl text-center">Date</th>
            <th  className="bg-blue-600 text-white px-3 py-2 rounded-xl text-center">Status</th>
            <th  className="bg-blue-600 text-white px-3 py-2 rounded-xl text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, ind) => (
            <tr key={user.id} className={ind%2?"bg-white px-3 py-2 rounded-xl":"bg-gray-200 px-3 py-2 rounded-xl"}>
              <th className="p-3 text-sm text-gray-700">{user?.Name}</th>
              <th className="p-3 text-sm text-gray-700">{user?.date}</th>
              <th className="p-3 text-sm text-gray-700">{user?.status}</th>
              <th className="p-3 text-sm text-gray-700">
                <button className="px-1 py-2 rounded-xl bg-blue-300 hover:scale-105 duration-300 bg-blue-400"
                  onClick={() => {
                    updateCurrentUser(user.status, user.id);
                  }}>
                  Update Status
                </button>
                <button className="px-2 py-2 rounded-xl bg-blue-300 hover:scale-105 duration-300 bg-blue-400"
                  onClick={() => {
                    deleteUser(user.id);
                  }}>
                  delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th className="bg-white rounded-xl text-sm text-gray-700">
              <input
                placeholder="Name"
                className="px-4 py-2 border"
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
            </th>
            <th className="bg-white  rounded-xl text-sm text-gray-700">
              <input
                placeholder="Date"
                className="px-4 py-2 border"
                onChange={(e) => {
                  setNewDate(e.target.value);
                }}
              />
            </th>
            <th className="bg-white rounded-xl text-sm text-gray-700">
              <input
                placeholder="status"
                className="px-4 py-2 border"
                onChange={(e) => {
                  setNewStatus(e.target.value);
                }}
              />
            </th>
            <th className="bg-white px-3 py-2 rounded-xl text-sm text-gray-700">
              <button onClick={addUser} className="px-2 py-2 rounded-xl bg-blue-300 hover: scale-105 duration-300">Add User</button>
            </th>
          </tr>
        </tfoot>
      </table>
      )}
      
    </div>
  );
};

export default UserDetails;