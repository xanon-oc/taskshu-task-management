import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const UpdateTask = () => {
  const data = useLoaderData();
  const id = data._id;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const taskAddedDate = new Date();
    data.taskAddedDate = taskAddedDate;
    axios
      .patch(
        `https://taskshu-task-management-server.vercel.app/updateTask?id=${id}`,
        data
      )
      .then((res) => {
        console.log(res);
        toast.success("Task updated successfully");
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-bold mb-6">
        <span className="text-base">Update your existing Task</span> <br /> Here
      </h2>
      <div className="md:mx-48 max-w-xl">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Task Name</span>
          </label>
          <input
            defaultValue={data.taskName}
            {...register("taskName")}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            value={data.description}
            {...register("description", { required: true })}
            className="textarea textarea-bordered h-44 w-full "
            placeholder="Bio"
          ></textarea>
        </div>

        <input
          type="submit"
          value="Submit Class"
          className="btn flex w-full  mx-auto mt-4"
        />
      </div>
    </form>
  );
};

export default UpdateTask;
