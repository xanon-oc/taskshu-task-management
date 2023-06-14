import TaskCard from "../../Components/TaskCard";

const FinishedTask = ({ finishedData, handleDelete }) => {
  return (
    <div className="h-[88vh] bg-slate-50 rounded-xl p-4 overflow-hidden overflow-y-auto">
      <h2 className="grid h-12 p-2 w-full place-content-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-600 mb-4">
        This is the finished working on task section
      </h2>
      {finishedData.map((d) => (
        <TaskCard
          key={d._id}
          _id={d._id}
          taskName={d.taskName}
          image={d.image}
          publisherName={d.publisherName}
          description={d.description}
          taskAddedDate={d.taskAddedDate}
          status={d.status}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default FinishedTask;
