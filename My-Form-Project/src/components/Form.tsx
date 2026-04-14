import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { employeeType } from "../utils/global";

type propsType = {
  allEmployees: employeeType[];
  setAllEmployees: (value: React.SetStateAction<employeeType[]>) => void;
  editEmployee: employeeType | undefined;
  editIndex: number | null;
  setEditIndex: (value: React.SetStateAction<number | null>) => void;
};

export default function Form({
  allEmployees,
  setAllEmployees,
  editEmployee,
  editIndex,
  setEditIndex,
}: propsType) {
  const [fName, setFName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [error, setError] = useState<any>({});

  const allSkills = ["React", "Node.js", "Python", "UI/UX", "DevOps"];
  const allCity = ["Surat", "Pune", "Bengaluru", "Mumbai", "Noida"];

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(allEmployees));
  }, [allEmployees]);

  useEffect(() => {
    if (editEmployee) {
      setFName(editEmployee.fName);
      setLName(editEmployee.lName);
      setEmail(editEmployee.email);
      setPhone(editEmployee.phone);
      setGender(editEmployee.gender);
      setSkills(editEmployee.skills);
      setCity(editEmployee.city);
      setAddress(editEmployee.address);
    }
  }, [editEmployee]);

  const getEmployeeSkill = (event: any) => {
    const data = event.target.value; 
    const isChecked = event.target.checked; 

    if (isChecked) {
      setSkills((prev) => [...prev, data]);
    } else {
      setSkills((prev) => prev.filter((skill) => skill !== data));
    }
  };

  const validation = () => {
    let newError: any = {};

    if (!fName) newError.fname = "First name is required..";
    if (!lName) newError.lname = "Last name is required..";

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newError.email = "Email is required..";
    } else if (!emailPattern.test(email)) {
      newError.email = "Invalid email address...";
    }

    const phonePattern = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    if (!phone) {
      newError.phone = "Phone number is required..";
    } else if (phone.length !== 10 || !phonePattern.test(phone)) {
      newError.phone = "Invalid phone number..";
    }

    if (!gender) newError.gender = "Gender is required..";
    if (skills.length === 0) newError.skills = "At least one skill is required..";
    if (!city || city === "select") newError.city = "City is required..";
    if (!address) newError.address = "Address is required..";

    setError(newError);
    return Object.keys(newError).length;
  };

  const employeeFormSubmit = (event: any) => {
    event.preventDefault(); 

    if (validation() !== 0) {
      return;
    }

    const employeeData: employeeType = {
      fName,
      lName,
      email,
      phone,
      gender,
      skills,
      city,
      address,
    };

    if (editIndex !== null) {
      let updateEmp = [...allEmployees];
      updateEmp[editIndex] = employeeData;
      setAllEmployees(updateEmp);
      setEditIndex(null);
      toast.success("Employee updated successfully...", { theme: "dark" });
    } else {
      setAllEmployees((prev) => [...prev, employeeData]);
      toast.success("Employee added successfully...", { theme: "dark" });
    }

    // Reset Form
    setFName("");
    setLName("");
    setEmail("");
    setPhone("");
    setGender("");
    setSkills([]);
    setCity("");
    setAddress("");
  };

  const inputStyle = (hasError: boolean) => 
    `w-full px-4 py-3 rounded-xl border ${hasError ? "border-red-500/50 bg-red-500/5 focus:ring-red-500" : "border-slate-700 bg-slate-800/50 focus:ring-teal-500 focus:border-teal-500"} text-white transition-all duration-200 outline-none placeholder-slate-500 shadow-inner`;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-10 mt-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
          Employee <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Directory</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Add or update staff member information in the central database.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden">
        
        <div className="bg-slate-800/80 border-b border-slate-700/50 px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-white text-xl font-bold flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
              Registration Form
            </h2>
            {fName && <p className="text-teal-400/80 text-sm mt-1">Currently registering: {fName}</p>}
          </div>
        </div>

        <form className="p-8 sm:p-10 space-y-8" onSubmit={employeeFormSubmit}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">First Name <span className="text-teal-400">*</span></label>
              <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} className={inputStyle(error.fname)} placeholder="e.g. John" />
              {error.fname && <span className="text-red-400 text-sm mt-1 block">{error.fname}</span>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Last Name <span className="text-teal-400">*</span></label>
              <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} className={inputStyle(error.lname)} placeholder="e.g. Doe" />
              {error.lname && <span className="text-red-400 text-sm mt-1 block">{error.lname}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Email Address <span className="text-teal-400">*</span></label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputStyle(error.email)} placeholder="john.doe@company.com" />
              {error.email && <span className="text-red-400 text-sm mt-1 block">{error.email}</span>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">Phone Number <span className="text-teal-400">*</span></label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputStyle(error.phone)} placeholder="9876543210" />
              {error.phone && <span className="text-red-400 text-sm mt-1 block">{error.phone}</span>}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-300">Gender <span className="text-teal-400">*</span></label>
            <div className="flex flex-wrap gap-6 pt-2">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="radio" name="gender" value={g} checked={gender === g} onChange={(e) => setGender(e.target.value)} className="peer appearance-none w-5 h-5 border border-slate-500 rounded-full bg-slate-800 checked:border-teal-400 transition-all cursor-pointer" />
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-teal-400 scale-0 peer-checked:scale-100 transition-transform"></div>
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors">{g}</span>
                </label>
              ))}
            </div>
            {error.gender && <span className="text-red-400 text-sm mt-1 block">{error.gender}</span>}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-300">Technical Skills <span className="text-teal-400">*</span></label>
            <div className="flex flex-wrap gap-4 pt-2">
              {allSkills.map((mySkill, index) => (
                <label key={index} className={`flex items-center px-4 py-2 rounded-lg border cursor-pointer transition-all ${skills.includes(mySkill) ? 'bg-teal-500/10 border-teal-500/50 text-teal-300' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'}`}>
                  <input type="checkbox" value={mySkill} checked={skills.includes(mySkill)} onChange={getEmployeeSkill} className="hidden" />
                  <span className="text-sm font-medium">{mySkill}</span>
                </label>
              ))}
            </div>
            {error.skills && <span className="text-red-400 text-sm mt-1 block">{error.skills}</span>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-300">Office Location <span className="text-teal-400">*</span></label>
            <div className="relative">
              <select value={city} onChange={(e) => setCity(e.target.value)} className={`${inputStyle(error.city)} appearance-none cursor-pointer`}>
                <option value="select" className="bg-slate-800 text-slate-400">Select an office location</option>
                {allCity.map((myCity, index) => (
                  <option key={index} value={myCity} className="bg-slate-800 text-white">{myCity}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            {error.city && <span className="text-red-400 text-sm mt-1 block">{error.city}</span>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-300">Residential Address <span className="text-teal-400">*</span></label>
            <textarea rows={3} value={address} onChange={(e) => setAddress(e.target.value)} className={`${inputStyle(error.address)} resize-none`} placeholder="Enter full residential address"></textarea>
            {error.address && <span className="text-red-400 text-sm mt-1 block">{error.address}</span>}
          </div>

          <div className="pt-6">
            <button type="submit" className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transition duration-300 transform hover:-translate-y-1 ${editIndex !== null ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white" : "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"}`}>
              {editIndex !== null ? "Update Employee Data" : "Register Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}