import TaskCard from "../../Components/TaskCard";

const Pending = ({
  closeModal,
  handleClick,
  modalData,
  modalOpen,
  pendingData,
  handlePending,
  handleDelete,
}) => {
  return (
    <div className="h-[88vh] bg-slate-50 rounded-xl p-4 overflow-hidden overflow-y-auto">
      <h2 className="grid h-10 w-full place-content-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-600 mb-4">
        This is the pending task section
      </h2>
      {pendingData.map((d) => (
        <TaskCard
          key={d._id}
          _id={d._id}
          taskName={d.taskName}
          image={d.image}
          publisherName={d.publisherName}
          description={d.description}
          taskAddedDate={d.taskAddedDate}
          status={d.status}
          handlePending={handlePending}
          handleDelete={handleDelete}
          closeModal={closeModal}
          handleClick={handleClick}
          modalData={modalData}
          modalOpen={modalOpen}
        />
      ))}
    </div>
  );
};

export default Pending;
