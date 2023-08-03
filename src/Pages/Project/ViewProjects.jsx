import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../AuthProviders/AuthProvider";
import ProjectPending from "../../Dashboard/Home/ProjectPending";
import CompletedProject from "../../Dashboard/Home/CompletedProject";
import React from "react";
import WorkeSpacePendingData from "../../Dashboard/Home/WorkeSpacePendingData";
import WorkSpaceCompletedProject from "../../Dashboard/Home/WorkSpaceCompletedProject";

const ViewProjects = () => {
  const { user } = useContext(AuthContext);

  const {
    data: pendingProjectsData = [],
    refetch: pendingProjectsDataRefetch,
  } = useQuery(["pendingProjectsData", user?.email], async () => {
    const res = await axios.get(
      `https://taskshu-task-management-server.vercel.app/addedProjects/pendingDataGet/${user?.email}`
    );
    return res.data;
  });
  const {
    data: pendingSharedProjectsData = [],
    refetch: pendingSharedProjectsDataRefetch,
  } = useQuery(["pendingSharedProjectsData", user?.email], async () => {
    const res = await axios.get(
      `https://taskshu-task-management-server.vercel.app/showUserSharedProjects/projects/${user?.email}`
    );
    return res.data;
  });
  const {
    data: completedProjectsData = [],
    refetch: completedProjectsDataRefetch,
  } = useQuery(["completedProjectsData", user?.email], async () => {
    const res = await axios.get(
      `https://taskshu-task-management-server.vercel.app/addedCompletedProjects/CompletedDataGet/${user?.email}`
    );
    return res.data;
  });
  const {
    data: workSpaceCompletedProjectsData = [],
    refetch: workSpaceCompletedProjectsDataRefetch,
  } = useQuery(["workSpaceCompletedProjectsData", user?.email], async () => {
    const res = await axios.get(
      `https://taskshu-task-management-server.vercel.app/completedDataSharedProjects/CompletedSharedDataGet/${user?.email}`
    );
    return res.data;
  });
  console.log(workSpaceCompletedProjectsData);
  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 3,
  });

  const wrapperRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab >= 1 &&
          tabSelected.currentTab < tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab + 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: 1,
          });
        }
      }
    }

    if (e.keyCode === 37) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab > 1 &&
          tabSelected.currentTab <= tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab - 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.noTabs,
          });
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div>
      {/*<!-- Component: Pill lg sized tab --> */}
      <section className="max-w-full" aria-multiselectable="false">
        <ul
          className="flex justify-center items-center gap-2 border-[2px] border-gray-200 py-3 rounded-lg"
          role="tablist"
          ref={wrapperRef}
        >
          <li className="" role="presentation">
            <button
              className={`uppercase inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 text-sm font-medium tracking-wide transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed ${
                tabSelected.currentTab === 1
                  ? "bg-emerald-500 text-white hover:bg-emerald-600 focus:bg-emerald-700 disabled:bg-emerald-300"
                  : "w-full justify-self-center stroke-slate-700 text-slate-700 hover:bg-emerald-50 hover:stroke-emerald-500 hover:text-emerald-500 focus:bg-emerald-50 focus:stroke-emerald-600 focus:text-emerald-600 disabled:text-emerald-300"
              }`}
              id="tab-label-1e"
              role="tab"
              aria-setsize="3"
              aria-posinset="1"
              tabIndex={`${tabSelected.currentTab === 1 ? "0" : "-1"}`}
              aria-controls="tab-panel-1e"
              aria-selected={`${
                tabSelected.currentTab === 1 ? "true" : "false"
              }`}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 1 })}
            >
              <span className="flex items-center gap-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
                Projects
              </span>
            </button>
          </li>
          <li className="" role="presentation">
            <button
              className={`uppercase inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 text-sm font-medium tracking-wide transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed ${
                tabSelected.currentTab === 2
                  ? "bg-emerald-500 text-white hover:bg-emerald-600 focus:bg-emerald-700 disabled:bg-emerald-300"
                  : "w-full justify-self-center stroke-slate-700 text-slate-700 hover:bg-emerald-50 hover:stroke-emerald-500 hover:text-emerald-500 focus:bg-emerald-50 focus:stroke-emerald-600 focus:text-emerald-600 disabled:text-emerald-300"
              }`}
              id="tab-label-2e"
              role="tab"
              aria-setsize="3"
              aria-posinset="2"
              tabIndex={`${tabSelected.currentTab === 2 ? "0" : "-1"}`}
              aria-controls="tab-panel-2e"
              aria-selected={`${
                tabSelected.currentTab === 2 ? "true" : "false"
              }`}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 2 })}
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                  />
                </svg>
                Work Space
              </span>
            </button>
          </li>
        </ul>
        <div className="">
          <div
            className={`px-6 py-4 ${
              tabSelected.currentTab === 1 ? "" : "hidden"
            }`}
            id="tab-panel-1e"
            aria-hidden={`${tabSelected.currentTab === 1 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-1e"
            tabIndex="-1"
          >
            <div className="grid lg:grid-cols-2 gap-4 ">
              <div>
                <ProjectPending pendingProjectsData={pendingProjectsData} />
              </div>
              <div>
                <CompletedProject
                  completedProjectsData={completedProjectsData}
                />
              </div>
            </div>
          </div>
          <div
            className={`px-6 py-4 ${
              tabSelected.currentTab === 2 ? "" : "hidden"
            }`}
            id="tab-panel-2e"
            aria-hidden={`${tabSelected.currentTab === 2 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-2e"
            tabIndex="-1"
          >
            {/* Work Space */}
            <div className="grid lg:grid-cols-2 gap-4 ">
              <div>
                <WorkeSpacePendingData
                  pendingSharedProjectsData={pendingSharedProjectsData}
                />
              </div>
              <div>
                <WorkSpaceCompletedProject
                  completedProjectsData={workSpaceCompletedProjectsData}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*<!-- End Pill lg sized tab --> */}
    </div>
  );
};

export default ViewProjects;
