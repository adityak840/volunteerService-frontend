"use client";

import { useEffect, useState } from "react";
import Individual from "./components/individual";
import Organisation from "./components/organisation"; 
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";  // Importing Toastify
import "react-toastify/dist/ReactToastify.css";  // Import Toast styles

export default function Home() {
  const [userType, setUserType] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [orgName, setOrgName] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get userType and user details from localStorage when the component mounts
    const storedUserType = localStorage.getItem("userType");
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    const storedEmail = localStorage.getItem("email");
    const storedOrgName = localStorage.getItem("orgName");

    setUserType(storedUserType);
    setFirstName(storedFirstName);
    setLastName(storedLastName);
    setEmail(storedEmail);
    setOrgName(storedOrgName);

    // If no userType is found in localStorage, show a toast and redirect to login
    if (storedUserType === null) {
      toast.error("You are not logged in! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");  // Redirect to login after toast
      }, 2000);  // Wait for 2 seconds before redirecting
    }
  }, [router]);

  const handleLogout = () => {
    // Clear all data from localStorage
    localStorage.clear();

    // Redirect to the login page
    router.push("/login");  // Redirect to the login page
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Render loading state while userType is being fetched
  if (userType === null) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-10">
        Loading...
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-4 gap-16 sm:p-20">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">Volunteer Matching Service</div>
        <div className="flex gap-x-16">
          <div 
            className="cursor-pointer" 
            onClick={toggleDropdown}
          >
            {firstName} {lastName}
          </div>
          {isDropdownOpen && (
            <div className="absolute bg-gray-600 shadow-lg rounded-md p-4 mt-2 z-50 mt-6 mr-10">
              <div className="flex gap-x-2"><p>Name:</p> {firstName} {lastName}</div>
              <div className="flex gap-x-2"><p>Email:</p> {email}</div>
              {userType === "organisation" && orgName && (
                <div className="flex gap-x-2"><p>Organization Name:</p> {orgName}</div>
              )}
            </div>
          )}
          <button onClick={handleLogout} className="cursor-pointer text-red-500">
            Log Out
          </button>
        </div>
      </div>
      {userType === "individual" ? (
        <Individual />
      ) : userType === "organisation" ? (
        <Organisation />
      ) : (
        <div>Unknown user type</div>
      )}
      <ToastContainer />
    </div>
  );
}
