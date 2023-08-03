import axios from "axios";

// save a data to database
export const saveUser = (user) => {
  const currentUser = {
    email: user.email,
    photo: user.photoURL,
    name: user.displayName,
  };
  console.log(currentUser);
  console.log(user.email);
  axios
    .put(
      `https://taskshu-task-management-server.vercel.app/users/dataPost/${user?.email}`,
      currentUser
    )
    .then((res) => console.log(res.data));
};
