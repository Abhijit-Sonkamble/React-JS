import { useEffect, useState } from "react";
import type { employeeType } from "../utils/global";

type propsType = {
  allEmployees: employeeType[];
  deleteEmployee: (index: number) => void;
  updateEmployee: (index: number) => void;
};

export default function Table({
  allEmployees,
  deleteEmployee,
  updateEmployee,
}: propsType) {
  const [numberOfCity, setNumberOfCity] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    let allCity: any = allEmployees.map((emp) => emp.city);
    allCity = new Set([...allCity]);
    setNumberOfCity(allCity.size);
  }, [allEmployees]);

  const filterEmployees = allEmployees.filter((emp) => {
    return (
      emp.fName.toLowerCase().includes(search.toLowerCase()) ||
      emp.lName.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.city.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="w-full mt-20">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Total Staff", val: allEmployees.length, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-500/20" },
          { title: "Male Staff", val: allEmployees.filter(e => e.gender === "Male").length, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-500/20" },
          { title: "Female Staff", val: allEmployees.filter(e => e.gender === "Female").length, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-500/20" },
          { title: "Active Locations", val: numberOfCity, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-500/20" }
        ].map((stat, i) => (
          <div key={i} className={`bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border ${stat.border} hover:bg-slate-800/60 transition duration-300`}>
             <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">{stat.title}</p>
             <p className={`text-4xl font-extrabold ${stat.color}`}>{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-4 mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input
            type="text"
            placeholder="Search employees by name, email, or location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700/50">
            <thead className="bg-slate-900/80">
              <tr>
                {["No", "Name", "Contact", "Gender", "Skills", "Location", "Actions"].map((head, i) => (
                  <th key={i} className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filterEmployees.map((emp, index) => (
                <tr key={index} className="hover:bg-slate-700/30 transition duration-200 group">
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500 font-medium">{index + 1}</td>
                  
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {emp.fName.charAt(0)}{emp.lName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors">{emp.fName} {emp.lName}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm text-slate-300">{emp.email}</div>
                    <div className="text-xs text-slate-500 mt-1">{emp.phone}</div>
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${emp.gender === "Male" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : emp.gender === "Female" ? "bg-pink-500/10 text-pink-400 border border-pink-500/20" : "bg-slate-500/10 text-slate-400 border border-slate-500/20"}`}>
                      {emp.gender}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2 max-w-[200px]">
                      {emp.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-700/50 text-teal-300 text-xs font-medium rounded-md border border-slate-600/50">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm text-slate-300 font-medium flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      {emp.city}
                    </div>
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button onClick={() => updateEmployee(index)} className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-all" title="Edit">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>
                      <button onClick={() => deleteEmployee(index)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all" title="Delete">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filterEmployees.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <p className="text-lg">No records found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}