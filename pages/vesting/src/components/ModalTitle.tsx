// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export function ModalTitle({ title }: { title: string }) {
  return (
    <div className="text-darkGray2 mb-4 w-[calc(100%-32px)] text-lg font-bold">
      {title}
    </div>
  );
}
