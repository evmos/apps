// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const DescriptionItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col space-y-1 text-sm text-pearl md:flex-row md:space-y-0">
      <p className="min-w-[180px] uppercase">{title}</p>
      <p className="font-bold opacity-80">{description}</p>
    </div>
  );
};

export default DescriptionItem;
