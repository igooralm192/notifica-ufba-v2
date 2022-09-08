import { DisciplineMapper } from "@/mappers";
import { api } from "@/services/api";

import { IGetDisciplinesEndpoint } from "./types";

export const getDisciplines = async ({
  page,
  limit
}: IGetDisciplinesEndpoint.Request): Promise<IGetDisciplinesEndpoint.Response> => {
  const response = await api.get("/disciplines", {
    params: { page, limit }
  });

  const { results, total } = response.data;

  return {
    results: DisciplineMapper.toEntityList(results),
    total
  };
};
