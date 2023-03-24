const ContainerId = ({ id }: { id: string }) => {
  return (
    <div className="bg-black px-3 py-2 rounded-3xl font-bold text-pearl w-fit">
      #{id}
    </div>
  );
};

export default ContainerId;
