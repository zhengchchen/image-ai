import { useInfiniteQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

export type ResponseType = InferResponseType<(typeof client.api.projects)["$get"], 200>;

export const useGetProjects = () => {
  const query = useInfiniteQuery<ResponseType, Error>({
    initialPageParam: 1,
    getNextPageParam: ( lastPage ) => lastPage.nextPage,
    queryKey: ["projects"],
    queryFn: async ({ pageParam }) => {
      const response = await client.api.projects.$get({
        query: {
          limit: "5",
          page: (pageParam as number).toString(),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      return response.json();
    },
  });

  return query;
};
