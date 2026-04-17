import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Form from "./components/Form";
import Table from "./components/Table";
import { useState, useEffect } from "react";
import type { employeeType } from "./utils/global";

export default function App() {
  const [allEmployees, setAllEmployees] = useState<employeeType[]>(
    JSON.parse(localStorage.getItem("employees") || "[]")
  );
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editEmployee, setEditEmployee] = useState<employeeType>();

  useEffect(() => {
    console.log("Use Effect : ", allEmployees);
    localStorage.setItem("employees", JSON.stringify(allEmployees));
  }, [allEmployees]);

  const deleteEmployee = (index: number) => {
    setAllEmployees((allEmp) => allEmp.filter((_, i) => i !== index));
    toast.success("Employee deleted successfully..", { theme: "dark" });
  };

  const updateEmployee = (index: number) => {
    setEditIndex(index);
    console.log("Edit Employee : ", allEmployees[index]);
    setEditEmployee(allEmployees[index]);
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-slate-200 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-teal-500 selection:text-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <Form
            allEmployees={allEmployees}
            setAllEmployees={setAllEmployees}
            editEmployee={editEmployee}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
          />
          <Table
            allEmployees={allEmployees}
            deleteEmployee={deleteEmployee}
            updateEmployee={updateEmployee}
          />
        </div>
        <ToastContainer position="top-right" theme="dark" />
      </div>
    </>
  );
}