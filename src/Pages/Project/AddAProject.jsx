import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProviders/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";

const AddAProject = () => {
  const { user } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const { data: usersData = [] } = useQuery(
    ["workingTask", user?.email],
    async () => {
      const res = await axios.get(
        `https://taskshu-task-management-server.vercel.app/saveUsers/dataGet`
      );
      return res.data;
    }
  );

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const image = data.photo[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGGB_API_KEY
    }`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((info) => {
        const image = info.data.display_url;
        console.log(image);

        data.image = image;
        const projectAddedDate = new Date();
        data.projectAddedDate = projectAddedDate;
        // Get the selected option value
        const sharedUsersEmail =
          selectedOption !== null &&
          selectedOption.map((option) => ({
            email: option.value,
            photo: option.photo,
            status: "pending",
            title: "user",
          }));

        // Add the selected option value to the data object
        data.sharedUsersEmails = sharedUsersEmail;
        const infoData = {
          projectName: data.projectName,
          image: data.image,
          description: data.description,
          publisherName: data.publisherName,
          email: data.email,
          sharedUsersEmails: data.sharedUsersEmails,
        };
        console.log(infoData);
        axios
          .post(
            "https://taskshu-task-management-server.vercel.app/addNewProject/postDataProject",
            infoData
          )
          .then((res) => {
            console.log(res);
            toast.success("New Project Added");
          })
          .catch((err) => {
            console.log(err.message);
            alert(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="grid h-12 w-full place-content-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-600 mb-6">
        Add your new Project Here
      </h2>
      <div className="md:mx-48 max-w-2xl">
        <div className="grid md:grid-cols-2 md:gap-4">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Project Name</span>
            </label>
            <input
              {...register("projectName")}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              type="file"
              placeholder="Photo URL"
              {...register("photo")}
              className="file-input file-input-bordered w-full"
            />
            {errors.photo && (
              <span className="text-red-500">Photo is required</span>
            )}
          </div>
          {/* React Select Here */}
          <div className="mb-3">
            <label className="label">
              <span className="label-text">Select Workers</span>
            </label>
            <Select
              className="md:w-[94vh]"
              isMulti
              isSearchable
              value={selectedOption}
              onChange={handleChange}
              options={options}
              formatOptionLabel={formatOptionLabel}
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Bio"
          ></textarea>
        </div>
        {/* Hidden fields */}
        <div className="form-control w-full max-w-xs hidden">
          <label className="label">
            <span className="label-text hidden">Name</span>
          </label>
          <input
            {...register("publisherName")}
            value={user?.displayName}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs hidden"
          />
        </div>
        <div className="form-control w-full max-w-xs hidden">
          <label className="label">
            <span className="label-text hidden">Status</span>
          </label>
          <input
            {...register("status")}
            value="pending"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs hidden"
          />
        </div>
        <div className="form-control w-full max-w-xs hidden">
          <label className="label">
            <span className="label-text">User Email</span>
          </label>
          <input
            value={user?.email}
            {...register("email")}
            type="email"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <input
          type="submit"
          value="Add Project"
          className="btn flex w-full mx-auto mt-4"
        />
      </div>
    </form>
  );
};

export default AddAProject;
