import moment from "moment";

import { useContext, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../AuthProviders/AuthProvider";
import ModalContent from "./ModalContent";
const TaskCard = ({ data }) => {
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const { data: usersData = [] } = useQuery(
    ["allUsersData", user?.email],
    async () => {
      const res = await axios.get(
        `https://taskshu-task-management-server.vercel.app/saveUsers/dataGet`
      );
      return res.data;
    }
  );
  console.log(usersData);
  const options = usersData.map((option) => ({
    value: option.email,
    label: option.name,
    photo: option.photo,
    status: "pending",
  }));

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };
  const formatOptionLabel = ({ label, value, photo }) => (
    <div className="flex gap-2 items-center">
      {photo && (
        <img
          src={photo}
          alt="User"
          className="w-[28px] h-[28px] rounded-full"
        />
      )}
      <div>
        <div>{label}</div>
        <div className="text-gray-400 text-xs">{value}</div>
      </div>
    </div>
  );

  const submitUserNewData = () => {
    const sharedUsersEmail =
      selectedOption !== null &&
      selectedOption.map((option) => ({
        email: option.value,
        photo: option.photo,
        status: "pending",
        title: "user",
      }));
    console.log(sharedUsersEmail, "Babu");
    axios
      .patch(
        `https://taskshu-task-management-server.vercel.app/addedUserToProjects/add-emailData/${data._id}`,
        sharedUsersEmail
      )
      .then(() => {
        alert("Data send");
      })
      .catch((error) => {
        console.log(error, "Data not send");
      });
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const deleteUserFromProject = (email, id) => {
    console.log(email, id);
    axios
      .patch(
        `https://taskshu-task-management-server.vercel.app/deleteUserFromProjects/delete-emailData/${id}`,
        { email } // Send the email to be deleted in the request body
      )
      .then(() => {
        alert("User deleted");
      })
      .catch((error) => {
        console.log(error, "User not deleted");
      });
  };
  const handleCreatorCompletedTask = (id) => {
    console.log(id, "Task Completed");
    axios
      .patch(
        `https://taskshu-task-management-server.vercel.app/patchCompletedProjects/changeProjectToCompleted/${id}`
      )
      .then(() => {
        alert("Project Completed");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleUserDoneStatus = (id) => {
    console.log(id, "Task Completed");
    axios
      .patch(
        `https://taskshu-task-management-server.vercel.app/statusChangeUserSharedProjects/changeSharedUserStatus/${id}?email=${user.email}`
      )
      .then(() => {
        alert("You have Marked This Project as Completed");
      })
      .catch((error) => {
        console.log(error.message);
      });
    axios.patch(
      `https://taskshu-task-management-server.vercel.app/statusChangeMainDataSharedProjects/changeMainDataStatus/${id}?email=${user.email}`
    );
  };
  return (
    <div
      className="relative block  cursor-pointer overflow-hidden rounded-lg border bg-white border-gray-100 p-4 sm:p-6 lg:p-8 mb-4"
      onClick={openModal}
    >
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            {data.projectName}
          </h3>

          <p className="mt-1 text-xs font-medium text-gray-600">
            {data.publisherName}
            {data.email === user.email ? (
              <span className="inline-flex items-center uppercase ml-2 gap-1.5 py-.5 px-1 rounded-full text-xs font-medium text-black bg-yellow-400">
                <span className="w-1.5 h-1.5 inline-block bg-indigo-400 rounded-full"></span>
                {data.title}
              </span>
            ) : (
              <span className="ml-2 inline-flex items-center gap-1.5 py-.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <span className="w-1.5 h-1.5 inline-block bg-indigo-400 rounded-full"></span>
                Worker
              </span>
            )}
          </p>
        </div>

        <div className="hidden sm:block sm:shrink-0">
          <img
            alt={data.projectName}
            src={data.image}
            className="h-16 w-16 rounded-lg object-cover shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <dl className="flex">
            <div className="flex flex-col-reverse">
              <dd className="text-xs text-gray-500">
                <p>{moment(data.projectAddedDate).format("MMMM D, YY ")}</p>
              </dd>
              <dt className="text-sm font-medium text-gray-600">Published</dt>
            </div>
          </dl>
        </div>
        <div className="mt-auto flex gap-2">
          {/* USERS */}

          {/* Component: Rounded full base sized grouped compact avatars */}
          <div className="flex items-center justify-center w-full mt-6">
            <div className="flex -space-x-4 transition-all hover:-space-x-2">
              {data.sharedUsersEmails.length > 1 &&
                data.sharedUsersEmails.map((userD) => (
                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center w-8 h-8 text-white transition-all rounded-full"
                    key={userD.email} // Add a unique key prop for each mapped element
                  >
                    <img
                      src={userD?.photo}
                      alt="user name"
                      title="user name"
                      width="40"
                      height="40"
                      className="max-w-full border-2 border-white rounded-full object-cover"
                    />
                  </a>
                ))}

              <a
                href="#"
                className="relative inline-flex items-center justify-center w-8 h-8 text-sm transition-all border-2 border-white rounded-full bg-slate-200 text-slate-500"
              >
                +{data.sharedUsersEmails.length - 1}
              </a>
            </div>
          </div>
          {/* End Rounded full base sized grouped compact avatars */}
        </div>
      </div>
      <ModalContent
        data={data}
        isOpen={isOpen}
        options={options}
        handleChange={handleChange}
        submitUserNewData={submitUserNewData}
        formatOptionLabel={formatOptionLabel}
        deleteUserFromProject={deleteUserFromProject}
        closeModal={closeModal}
        selectedOption={selectedOption}
        handleCreatorCompletedTask={handleCreatorCompletedTask}
        handleUserDoneStatus={handleUserDoneStatus}
      />
    </div>
  );
};

export default TaskCard;
