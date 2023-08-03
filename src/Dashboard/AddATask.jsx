import { useContext } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../AuthProviders/AuthProvider";
import axios from "axios";

const AddATask = () => {
  const { user } = useContext(AuthContext);

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
        const taskAddedDate = new Date();
        data.taskAddedDate = taskAddedDate;
        axios
          .post(
            "https://taskshu-task-management-server.vercel.app/addNewTask",
            data
          )
          .then((res) => {
            console.log(res);
            toast.success("New Task Added");
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
        Add your new Task Here
      </h2>
      <div className="md:mx-48 max-w-2xl">
        <div className="grid md:grid-cols-2 md:gap-4">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Task Name</span>
            </label>
            <input
              {...register("taskName")}
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
              {...register("photo", { required: true })}
              className="file-input file-input-bordered w-full"
            />
            {errors.photo && (
              <span className="text-red-500">Photo is required</span>
            )}
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
          value="Submit Class"
          className="btn flex w-full mx-auto mt-4"
        />
      </div>
    </form>
  );
};

export default AddATask;
