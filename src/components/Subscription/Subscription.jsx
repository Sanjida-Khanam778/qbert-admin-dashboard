import { useState, useEffect } from "react";
import { GoPencil } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import {
  useAllPackagesQuery,
  useDeletePackageMutation,
} from "../../Api/authApi";
import { Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "../Shared/DeleteConfirmationModal";
// Remove static data array
// const data = [...];

export default function Subscription() {
  const [isLoading, setIsLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const [deletePackage] = useDeletePackageMutation();
  const [openDltModal, setOpenDltModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch packages from API
  const { data, isLoading: apiLoading, refetch } = useAllPackagesQuery();
  console.log(packages);

  useEffect(() => {
    if (data && data.results) {
      setPackages(data.results);
    }
    setIsLoading(apiLoading);
  }, [data, apiLoading]);

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleAmountChange = (index, value, id) => {
    const updatedPackages = packages.map((pkg, i) =>
      i === index ? { ...pkg, package_amount: value } : pkg
    );
    setPackages(updatedPackages);
    const newAmountData = {
      id,
      package_amount: { package_amount: value },
    };
    sendPackageAmount(newAmountData)
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        toast.error("Failed to update status");
      });
  };

  const handleStatusChange = (index, newStatus, id) => {
    const updatedPackages = packages.map((pkg, i) =>
      i === index ? { ...pkg, package_status: newStatus } : pkg
    );

    setPackages(updatedPackages);
    const newStatusData = {
      id,
      package_status: { package_status: newStatus },
    };
    sendPackageStatus(newStatusData)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((error) => {
        toast.error("Failed to update status");
      });
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await deletePackage(id).unwrap();
      toast.success("Package deleted successfully!");
      setOpenDltModal(false);
      setSelectedDeleteId(null);
      refetch();
    } catch (error) {
      toast.error(
        error?.data?.message || error.error || "Failed to delete package"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteModalOpen = (id) => {
    setSelectedDeleteId(id);
    setOpenDltModal(true);
  };

  const handleDeleteModalConfirm = () => {
    if (selectedDeleteId) {
      handleDelete(selectedDeleteId);
    }
  };

  const handleEditPage = (id) => {
    navigate(`/subscription/edit/${id}`);
  };

  const getStatusColor = (package_status) => {
    return package_status === "Active" ? " text-green-400" : "text-red-500";
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Yearly":
        return "text-[#A855F7]";
      case "Monthly":
        return "text-[#A855F7]";
      case "Free":
        return "text-neutral/40";
    }
  };
  return (
    <div className="p-4 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Subscription Type</h1>
        <button
          className="bg-primary text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/subscription/add")}
        >
          Add Package
        </button>
      </div>
      <div className="overflow-x-auto w-10/12 mx-auto mt-20">
        <table className="w-full">
          <thead>
            <tr className="text-left text-subgray border-b border-borderGray">
              <th className="pb-3 font-medium text-center">Package ID</th>
              <th className="pb-3 font-medium text-center">Package Amount</th>
              <th className="pb-3 font-medium text-center">Type</th>
              <th className="pb-3 font-medium text-center">Billing Interval</th>
              <th className="pb-3 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? "Loading"
              : packages?.map((pkg, index) => (
                  <tr key={index} className="">
                    <td className="py-4 text-[#222222] font-semibold text-center">
                      {pkg.id}
                    </td>

                    <td className="py-4 font-medium text-subgray text-center">
                      $ {pkg.amount}
                    </td>
                    <td
                      className={`py-4 font-medium text-center ${getTypeColor(
                        pkg.billing_interval
                      )}`}
                    >
                      {pkg.billing_interval === "month"
                        ? "Monthly"
                        : pkg.billing_interval === "6 months"
                        ? "6 Monthly"
                        : "Yearly"}
                    </td>
                    {/* <td className="py-4 text-center ">
                      <div className="relative inline-block">
                        <select
                          name="status"
                          value={pkg.package_status}
                          onChange={(e) => {
                            handleStatusChange(index, e.target.value, pkg.id);
                          }}
                          className={`appearance-none pr-8 pl-5 py-2 rounded-full text-xs font-bold outline-none cursor-pointer shadow-lg ${getStatusColor(
                            pkg.package_status
                          )}`}
                        >
                          <option
                            className="text-black bg-white"
                            value="Active"
                          >
                            Active
                          </option>
                          <option
                            className="text-black bg-white"
                            value="Postpone"
                          >
                            Postpone
                          </option>
                        </select>

                        {/* Custom dropdown arrow */}
                        {/* {pkg.package_type !== "Free" && (
                          <div
                            className={`pointer-events-none absolute inset-y-2 right-2 flex items-center text-gray-700 ${getStatusColor(
                              pkg.package_status
                            )}`}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>  */}
                    <td className="text-center">{pkg.interval_count}</td>
                    <td className="py-4 flex gap-4 justify-center items-center text-center">
                      <Pencil
                        className="w-5 h-5 text-primary cursor-pointer"
                        onClick={() => handleEditPage(pkg.id)}
                      />
                      <Trash
                        className="w-5 h-6 text-red-500 cursor-pointer"
                        onClick={() => handleDeleteModalOpen(pkg.id)}
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
          <DeleteConfirmationModal
            isOpen={openDltModal}
            onClose={() => setOpenDltModal(false)}
            onConfirm={handleDeleteModalConfirm}
            isLoading={isDeleting}
          />
        </table>
      </div>
    </div>
  );
}
