import { dAppStorePrisma as prisma } from "./client";

export const getUsers = async ({
  take,
  cursor,
}: {
  take?: number;
  cursor?: string;
}) => {
  const entries = await prisma.user.findMany({
    take,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      id: "asc",
    },
  });

  return {
    entries,
    cursor: entries[entries.length - 1]?.id,
  };
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const deleteUserById = async (id: string) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};
