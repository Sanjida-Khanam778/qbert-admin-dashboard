"use client"

import { useState, useEffect } from "react"
import { LuEye } from "react-icons/lu"
import { RiDeleteBin6Line } from "react-icons/ri"
import avatar from "../../assets/images/Avatar.png"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import DeleteConfirmationModal from "../Shared/DeleteConfirmationModal"
import { useDeleteUserMutation, useGetUsersQuery } from "../../Api/dashboardApi"

export default function UserDataTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [query, setQuery] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [openDltModal, setOpenDltModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)

  // Fetch users with pagination
  const { data: usersData, isLoading, error, refetch } = useGetUsersQuery(currentPage)
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

  // Calculate total pages
  const totalPages = usersData ? Math.ceil(usersData.count / 5) : 1

  // Smart pagination handler - automatically navigate to appropriate page
  useEffect(() => {
    if (usersData && usersData.results.length === 0 && currentPage > 1) {
      // If current page is empty and we're not on page 1, go to previous page
      setCurrentPage(currentPage - 1)
    }
  }, [usersData, currentPage])

  // Handle page changes and ensure we don't go beyond available pages
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  const handleDeleteUser = async () => {
    try {
      const currentPageUsersCount = filteredUsers.length
      const isLastUserOnPage = currentPageUsersCount === 1
      const isNotFirstPage = currentPage > 1

      await deleteUser(selectedUserId).unwrap()
      toast.success("User deleted successfully")

      // Smart navigation after deletion
      if (isLastUserOnPage && isNotFirstPage) {
        // If deleting the last user on a page that's not the first page,
        // navigate to the previous page
        setCurrentPage(currentPage - 1)
      }

      // Refetch data
      refetch()
    } catch (error) {
      toast.error("Failed to delete user")
      console.error("Delete error:", error)
    } finally {
      setOpenDltModal(false)
    }
  }

  // Get package type from package_name
  const getPackageType = (packageName) => {
    if (!packageName || !packageName.package_name) return "Free"
    const name = packageName.package_name.toLowerCase()
    if (name.includes("year")) return "Yearly"
    if (name.includes("month")) return "Monthly"
    return "Free"
  }

  // Filter users based on search query and sort
  const filteredUsers =
    usersData?.results?.filter((user) => {
      const packageType = getPackageType(user.package_name)
      const matchesType = sortBy === "" || packageType === sortBy
      const matchesQuery =
        user.fullname?.toLowerCase().includes(query.toLowerCase()) ||
        user.email?.toLowerCase().includes(query.toLowerCase()) ||
        false
      return matchesType && matchesQuery
    }) || []

  // Get type color
  const getTypeColor = (packageName) => {
    const type = getPackageType(packageName)
    switch (type) {
      case "Yearly":
        return "text-green-500"
      case "Monthly":
        return "text-yellow-500"
      case "Free":
        return "text-neutral/80"
      default:
        return "text-neutral/80"
    }
  }

  // Handle pagination with bounds checking
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  // Handle button click with event propagation stop
  const handleButtonClick = (event, modalSetter) => {
    event.stopPropagation()
    modalSetter(true)
  }

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [query, sortBy])

  if (error) {
    return (
      <div className="bg-accent font-lora h-[90vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">Error loading users: {error.message}</div>
          <button
            onClick={() => {
              setCurrentPage(1)
              refetch()
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-accent font-lora h-[90vh]">
      <div className="px-8 rounded-lg">
        {/* Search and filter bar */}
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Client Management</h1>
          <div className="flex items-center gap-4">
            {/* search */}
            <input
              type="text"
              placeholder="Search by name or email..."
              className="p-2 border rounded-md bg-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* filter */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-6 pr-6 py-2 focus:outline-none focus:ring-1"
              >
                <option value={""}>All</option>
                <option value={"Yearly"}>Sort by: Yearly</option>
                <option value={"Monthly"}>Sort by: Monthly</option>
                <option value={"Free"}>Sort by: Free</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full mx-auto mt-10">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral tracking-wider">User name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral tracking-wider">Type</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-neutral tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                      <span className="ml-2">Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    <div className="py-8">
                      <div className="text-gray-500 mb-2">
                        {query || sortBy ? "No users found matching your criteria" : "No users found"}
                      </div>
                      {(query || sortBy) && (
                        <button
                          onClick={() => {
                            setQuery("")
                            setSortBy("")
                          }}
                          className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="w-8 h-8 mr-4 rounded-full"
                          src={user.image || avatar}
                          alt=""
                          onError={(e) => {
                            e.target.src = avatar
                          }}
                        />
                        <div className="text-sm font-medium text-gray-900">{user.fullname || "No Name"}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${getTypeColor(user.package_name)}`}>
                        {getPackageType(user.package_name)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-5 text-right">
                      <Link to={`/clients/${user.id}`}>
                        <button>
                          <LuEye className="text-2xl cursor-pointer" />
                        </button>
                      </Link>
                      <button
                        onClick={(e) => {
                          handleButtonClick(e, setOpenDltModal)
                          setSelectedUserId(user.id)
                        }}
                        disabled={isDeleting}
                      >
                        <RiDeleteBin6Line className="text-2xl text-red-500 cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Enhanced Pagination */}
        {usersData && usersData.count > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 mt-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{filteredUsers.length > 0 ? (currentPage - 1) * 5 + 1 : 0}</span> to{" "}
                  <span className="font-medium">{Math.min(currentPage * 5, usersData.count)}</span> of{" "}
                  <span className="font-medium">{usersData.count}</span> results
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isLoading}
                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 text-sm rounded-md ${
                          currentPage === pageNum
                            ? "bg-blue-500 text-white"
                            : "bg-white border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || isLoading}
                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        <DeleteConfirmationModal
          isOpen={openDltModal}
          onClose={() => setOpenDltModal(false)}
          onConfirm={handleDeleteUser}
          isLoading={isDeleting}
        />
      </div>
    </div>
  )
}
