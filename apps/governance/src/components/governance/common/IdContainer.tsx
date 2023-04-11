const ContainerId = ({ id }: { id: string }) => {
  return (
    <div className="w-fit rounded-3xl bg-black px-3 py-2 font-bold text-pearl">
      #{id}
    </div>
  );
};

export default ContainerId;
