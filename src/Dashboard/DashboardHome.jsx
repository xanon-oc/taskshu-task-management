import React, { useContext, useState } from "react";
import Pending from "./Home/Pending";
import StartedWorking from "./Home/StartedWorking";
import FinishedTask from "./Home/FinishedTask";
import { toast } from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../AuthProviders/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  // pending stack
  const { data: pendingData = [], refetch: pendingRefetch } = useQuery(
    ["pendingTask", user?.email],
    async () => {
      const res = await axios.get(
        `https://taskshu-task-management-server-dnyieasi5-xanon-oc.vercel.app/pendingTask?email=${user?.email}`
      );
      return res.data;
    }
  );

  // started working stack
  const { data: startedWorkingData = [], refetch: workingRefetch } = useQuery(
    ["workingTask", user?.email],
    async () => {
      const res = await axios.get(
        `https://taskshu-task-management-server-dnyieasi5-xanon-oc.vercel.app/workingTask?email=${user?.email}`
      );
      return res.data;
    }
  );

  // finished task stack

  const { data: finishedData = [], refetch } = useQuery(
    ["finishedTask", user?.email],
    async () => {
      const res = await axios.get(
        `https://taskshu-task-management-server-dnyieasi5-xanon-oc.vercel.app/finishedTask?email=${user?.email}`
      );
      return res.data;
    }
  );
  // handle pending
  const handlePending = (id) => {
    console.log(id);
    toast((t) => (
      <span className="flex gap-4 items-center justify-center">
        Please Confirm - To set as working
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        |
        <button
          className="btn btn-warning btn-sm bg-green-500 border-none text-white"
          onClick={() => {
            axios
              .patch(
                `https://taskshu-task-management-server-dnyieasi5-xanon-oc.vercel.app/status/pending/${id}`
              )
              .then((response) => {
                if (response.status === 200) {
                  toast.success("Confirmed to set as working!");
                  pendingRefetch();
                  workingRefetch();
                  refetch();
                }
              })
              .catch((error) => {
                console.log(error); // Handle any error that occurred during the request
              });
            toast.dismiss(t.id);
          }}
        >
          CONFIRM
        </button>
      </span>
    ));
  };

  // handleWorking
  const handleWorking = (id) => {
    console.log(id);
    toast((t) => (
      <span className="flex gap-4 items-center justify-center">
        Please Confirm - To set as working
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        |
        <button
          className="btn btn-warning btn-sm bg-green-500 border-none text-white"
          onClick={() => {
            axios
              .patch(
                `https://taskshu-task-management-server-dnyieasi5-xanon-oc.vercel.app/status/finished/${id}`
              )
              .then((response) => {
                if (response.status === 200) {
                  toast.success("Confirmed to set as working!");
                  pendingRefetch();
                  workingRefetch();
                  refetch();
                }
              })
              .catch((error) => {
                console.log(error); // Handle any error that occurred during the request
              });
            toast.dismiss(t.id);
          }}
        >
          CONFIRM
        </button>
      </span>
    ));
  };

  // delete handler
  const handleDelete = (id) => {
    console.log(id);
    toast((t) => (
      <span className="flex gap-4 items-center justify-center">
        Please Confirm - To set as working
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        |
        <button
          className="btn btn-warning btn-sm bg-green-500 border-none text-white"
          onClick={() => {
            axios
              .delete(
                `https://taskshu-task-management-server-dnyieasi5-xanon-oc.vercel.app/deleteTask/${id}`
              )
              .then((response) => {
                if (response.status === 200) {
                  pendingRefetch();
                  workingRefetch();
                  refetch();
                  toast.success("Confirmed to delete this task!");
                }
              })
              .catch((error) => {
                console.log(error);
              });
            toast.dismiss(t.id);
          }}
        >
          CONFIRM
        </button>
      </span>
    ));
  };

  // modal handler
  const handleClick = (singleData) => {
    const data = singleData;
    openModal(data);
  };
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      <div>
        <Pending
          pendingData={pendingData}
          handlePending={handlePending}
          handleDelete={handleDelete}
        />
      </div>
      <div>
        <StartedWorking
          startedWorkingData={startedWorkingData}
          handleWorking={handleWorking}
          refetch={refetch}
          handleDelete={handleDelete}
        />
      </div>
      <div>
        <FinishedTask
          handleClick={handleClick}
          finishedData={finishedData}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default DashboardHome;
