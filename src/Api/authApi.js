import { setCredentials } from "../features/authSlice";
import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login/",
        method: "POST",
        body: data,
      }),
    }),

    allRecipe: builder.query({
      query: ({ search = "", page = 1, page_size = 9 } = {}) =>
        `/adminapi/recipes/?search=${search}&page=${page}&page_size=${page_size}`,
      providesTags: ["users"],
    }),

    createRecipe: builder.mutation({
      query: (data) => ({
        url: "/adminapi/recipes/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    getRecipe: builder.query({
      query: (id) => `/adminapi/recipes/${id}/`,
      providesTags: ["users"],
    }),

    updateRecipe: builder.mutation({
      query: ({ id, data }) => ({
        url: `/adminapi/recipes/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    deleteRecipe: builder.mutation({
      query: (id) => ({
        url: `/adminapi/recipes/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    allWorkout: builder.query({
      query: ({ search = "", page = 1, page_size = 9, sort = "" } = {}) => {
        let url = `/adminapi/workouts/?search=${search}&page=${page}&page_size=${page_size}`;
        return url;
      },
      providesTags: ["users"],
    }),

    getWorkout: builder.query({
      query: (id) => `/adminapi/workouts/${id}/`,
      providesTags: ["users"],
    }),

    createWorkout: builder.mutation({
      query: (data) => ({
        url: "/adminapi/workouts/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    updateWorkout: builder.mutation({
      query: ({ id, data }) => ({
        url: `/adminapi/workouts/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    deleteWorkout: builder.mutation({
      query: (id) => ({
        url: `/adminapi/workouts/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    getPrivacyPolicy: builder.query({
      query: () => "/adminapi/privacy/",
      providesTags: ["privacy"],
    }),

    // createPrivacyPolicy: builder.mutation({
    //   query: (data) => ({
    //     url: "/adminapi/privacy/",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["privacy"],
    // }),

    updatePrivacyPolicy: builder.mutation({
      query: ({ id, data }) => ({
        url: `/adminapi/privacy/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["privacy"],
    }),

    getTerms: builder.query({
      query: () => "/adminapi/terms/",
      providesTags: ["terms"],
    }),
    createTerms: builder.mutation({
      query: (data) => ({
        url: "/adminapi/terms/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["terms"],
    }),
    updateTerms: builder.mutation({
      query: ({ id, data }) => ({
        url: `/adminapi/terms/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["terms"],
    }),

    addPackage: builder.mutation({
      query: (data) => ({
        url: "/adminapi/packages/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["packages"],
    }),

    allPackages: builder.query({
      query: () => "/adminapi/packages/",
      providesTags: ["packages"],
    }),

    getPackage: builder.query({
      query: (id) => `/adminapi/packages/${id}/`,
      providesTags: ["packages"],
    }),
    updatePackage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/adminapi/packages/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["packages"],
    }),
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/adminapi/packages/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["packages"],
    }),
  }),
});

export const {
  useLoginMutation,
  useAllRecipeQuery,
  useCreateRecipeMutation,
  useGetRecipeQuery,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useAllWorkoutQuery,
  useGetWorkoutQuery,
  useCreateWorkoutMutation,
  useUpdateWorkoutMutation,
  useDeleteWorkoutMutation,
  useGetPrivacyPolicyQuery,
  useCreatePrivacyPolicyMutation,
  useUpdatePrivacyPolicyMutation,
  useGetTermsQuery,
  useCreateTermsMutation,
  useUpdateTermsMutation,
  useAddPackageMutation,
  useAllPackagesQuery,
  useGetPackageQuery,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = authApi;
