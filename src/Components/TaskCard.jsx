import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import moment from "moment";

const TaskCard = ({
  _id,
  taskName,
  image,
  publisherName,
  description,
  taskAddedDate,
  status,
  handlePending,
  handleWorking,
  handleDelete,
}) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <motion.div
      transition={{ layout: { duration: 1, type: "spring" } }}
      layout
      style={{ borderRadius: "1rem" }}
      onClick={() => setOpen(!isOpen)}
      className="relative block overflow-hidden rounded-lg border bg-white border-gray-100 p-4 sm:p-6 lg:p-8 mb-4"
    >
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <motion.div className="sm:flex sm:justify-between sm:gap-4 cursor-pointer">
        <div>
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            {taskName}
          </h3>

          <p className="mt-1 text-xs font-medium text-gray-600">
            {publisherName}
          </p>
        </div>

        <div className="hidden sm:block sm:shrink-0">
          <img
            alt={publisherName}
            src={image}
            className="h-16 w-16 rounded-lg object-cover shadow-sm"
          />
        </div>
      </motion.div>
      {isOpen && (
        <motion.div>
          <div className="mt-4">
            <p className="max-w-[40ch] text-sm text-gray-500">{description}</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                  <dd className="text-xs text-gray-500">
                    <p>{moment({ taskAddedDate }).format("MMMM D, YY ")}</p>
                  </dd>
                  <dt className="text-sm font-medium text-gray-600">
                    Published
                  </dt>
                </div>
              </dl>
            </div>
            <div className="mt-auto flex gap-2">
              {status === "pending" && (
                <button
                  onClick={() => handlePending(_id)}
                  className="btn btn-sm group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:bg-[#F000B8] hover:text-white"
                >
                  Start
                </button>
              )}
              {status === "working" && (
                <button
                  onClick={() => handleWorking(_id)}
                  className="btn btn-sm group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:bg-[#F000B8] hover:text-white"
                >
                  Finished
                </button>
              )}
              <div className="grid md:grid-cols-1 gap-2">
                <Link
                  to={`/dashboard/updateTask/${_id}`}
                  htmlFor="my-modal-4"
                  className="btn btn-sm  group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:bg-[#F000B8] hover:text-white"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(_id)}
                  className="btn btn-sm  group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:bg-[#F000B8] hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskCard;
