// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const TitleContainer = ({ title }: { title: string }) => {
  return (
    <div className="text-lg font-bold text-pearl" data-testid="proposal-title">
      {title}
    </div>
  );
};

export default TitleContainer;
