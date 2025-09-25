import React, { useState } from "react";
import { Search, Edit2, Trash2, Eye } from "lucide-react";

export default function UserManagementTable() {
  const users = [
    { id: 1, name: "Alyvia Kelley", status: "Active", email: "a.kelley@gmail.com", dateOfBirth: "06/18/1978" },
    { id: 2, name: "Jaiden Nixon", status: "Active", email: "jaiden.n@gmail.com", dateOfBirth: "09/30/1963" },
    { id: 3, name: "Ace Foley", status: "Blocked", email: "ace.fo@yahoo.com", dateOfBirth: "12/09/1985" },
    { id: 4, name: "Nikolai Schmidt", status: "Active", email: "nikolai.schmidt1984@outlook.com", dateOfBirth: "03/22/1956" },
    { id: 5, name: "Clayton Charles", status: "Active", email: "me@clayton.com", dateOfBirth: "10/14/1971" },
    { id: 6, name: "Prince Chen", status: "Active", email: "prince.chen1987@gmail.com", dateOfBirth: "07/05/1992" },
    { id: 7, name: "Reece Duran", status: "Active", email: "reece@yahoo.com", dateOfBirth: "05/26/1980" },
    { id: 8, name: "Anastasia Mcdaniel", status: "Active", email: "anastasia.spring@mcdaniel12.com", dateOfBirth: "02/11/1968" },
    { id: 9, name: "Melvin Boyle", status: "Blocked", email: "Me.boyle@gmail.com", dateOfBirth: "08/03/1974" },
    { id: 10, name: "Kallee Thomas", status: "Blocked", email: "Kallee.thomas@gmail.com", dateOfBirth: "11/28/1954" },
    { id: 11, name: "Alyvia Kelley", status: "Active", email: "a.kelley@gmail.com", dateOfBirth: "06/18/1978" },
    { id: 12, name: "Jaiden Nixon", status: "Active", email: "jaiden.n@gmail.com", dateOfBirth: "09/30/1963" },
    { id: 13, name: "Ace Foley", status: "Blocked", email: "ace.fo@yahoo.com", dateOfBirth: "12/09/1985" },
    { id: 14, name: "Nikolai Schmidt", status: "Active", email: "nikolai.schmidt1984@outlook.com", dateOfBirth: "03/22/1956" },
    { id: 15, name: "Clayton Charles", status: "Active", email: "me@clayton.com", dateOfBirth: "10/14/1971" },
    { id: 16, name: "Prince Chen", status: "Active", email: "prince.chen1987@gmail.com", dateOfBirth: "07/05/1992" },
    { id: 17, name: "Reece Duran", status: "Active", email: "reece@yahoo.com", dateOfBirth: "05/26/1980" },
    { id: 18, name: "Anastasia Mcdaniel", status: "Active", email: "anastasia.spring@mcdaniel12.com", dateOfBirth: "02/11/1968" },
    { id: 19, name: "Melvin Boyle", status: "Blocked", email: "Me.boyle@gmail.com", dateOfBirth: "08/03/1974" },
    { id: 20, name: "Kallee Thomas", status: "Blocked", email: "Kallee.thomas@gmail.com", dateOfBirth: "11/28/1954" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const StatusBadge = ({ status }) => {
    const isActive = status === "Active";
    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isActive ? "bg-green-500" : "bg-black"}`}></div>
        <span className={`text-sm ${isActive ? "text-green-600" : "text-gray-800"}`}>{status}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden w-10/12 mx-auto my-auto">
      {/* Search Header */}
      <div className="p-4 border-gray bg-gray-50">
        <div className="relative max-w-sm ml-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full border border-gray rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto  border-2 rounded-lg border-gray">
        <table className="w-full shadow-lg bg-white">
          <thead>
            <tr className="border-b border-gray bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-Mail</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray">
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={user.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.dateOfBirth}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-gray-400 hover:text-blue-600 p-1"><Edit2 className="w-4 h-4" /></button>
                    <button className="text-gray-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                    <button className="text-gray-400 hover:text-gray-600 p-1"><Eye className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-3 bg-gray-50">
        <div className="flex items-center justify-center">
          <nav className="flex items-center space-x-1">
            {/* Prev button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              &lt;
            </button>

            {/* Page numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-2 text-sm rounded-md ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              &gt;
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
