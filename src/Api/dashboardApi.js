import { api } from "./api"

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "adminapi/dashboard-Stats/",
        method: "GET",
      }),
      providesTags: ["stats"],
    }),
    getMonthlyRevenueStats: builder.query({
      query: () => ({
        url: "adminapi/revenue-Monthly-stats/",
        method: "GET",
      }),
      providesTags: ["revenue"],
    }),
    getUserMonthlyStats: builder.query({
      query: () => ({
        url: "adminapi/user-Monthly-stats/",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    // New endpoints for user management
    getUsers: builder.query({
      query: (page = 1) => ({
        url: `adminapi/users/?page=${page}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `adminapi/user/${userId}/`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [{ type: "users", id: userId }],
    }),
    getUserStats: builder.query({
      query: (userId) => ({
        url: `adminapi/user-stats/${userId}/`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [{ type: "user-stats", id: userId }],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/userapi/delete-user/${userId}/`, 
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
})

export const {
  useGetDashboardStatsQuery,
  useGetMonthlyRevenueStatsQuery,
  useGetUserMonthlyStatsQuery,
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useGetUserStatsQuery,
  useDeleteUserMutation,
} = authApi
