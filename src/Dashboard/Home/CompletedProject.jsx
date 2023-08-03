import ProjectCard from "../../Components/ProjectCard";
const CompletedProject = ({ completedProjectsData }) => {
  console.log(completedProjectsData);
  return (
    <div className="h-[88vh] bg-slate-50 rounded-xl p-4 overflow-hidden overflow-y-auto">
      <h2 className="grid h-10 w-full place-content-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-600 mb-4">
        This is the pending Project section
      </h2>
      {completedProjectsData.map((data) => (
        <ProjectCard key={data._id} data={data} />
      ))}
    </div>
  );
};

export default CompletedProject;
