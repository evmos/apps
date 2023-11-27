// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const ContainerId = ({ id }: { id: string }) => {
  return (
    <div className="w-fit rounded-3xl bg-black px-3 py-2 font-bold text-pearl">
      #{id}
    </div>
  );
};

export default ContainerId;
