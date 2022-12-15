const ConfirmButton = ({ text }: { text: string }) => {
  return (
    <button className="bg-red text-white uppercase w-full rounded-lg px-8 py-4 mt-8 text-lg font-bold">
      {text}
    </button>
  );
};

export default ConfirmButton;
