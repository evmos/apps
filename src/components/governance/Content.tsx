import ContainerProposals from "./proposals/ContainerProposals";

const Content = () => {
  return (
    <div className="mt-5 overflow-y-auto max-h-[65vh] xl:scrollbar-hide text-white font-[IBM] w-full">
      <ContainerProposals />
    </div>
  );
};

export default Content;
