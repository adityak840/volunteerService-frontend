"use client";
import { SetStateAction, useState, ChangeEvent, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify functions and container
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

type Payload = {
  email: string;
  password: string;
  contactNo: string;
  userType: "individual" | "organisation";
  volType: string;
  orgName?: string; // Optional for organisation type
};

const SignUpPage = () => {
  const [userType, setUserType] = useState<"individual" | "organisation">("individual");
  const [volunteerType, setVolunteerType] = useState<string>(""); 
  const [organisationType, setOrganisationType] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [orgName, setOrgName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const volunteerTypes = [
    "Education",
    "Healthcare",
    "Environment",
    "Community Support",
    "Animal Welfare",
  ];

  const organisationTypes: { [key: string]: string[] } = {
    Education: ["Schools", "Tutoring Centers", "Libraries"],
    Healthcare: ["Hospitals", "Clinics", "Health NGOs"],
    Environment: [
      "Environmental NGOs",
      "Wildlife Conservation",
      "Recycling Initiatives",
    ],
    "Community Support": [
      "Food Banks",
      "Homeless Shelters",
      "Community Centers",
    ],
    "Animal Welfare": [
      "Animal Shelters",
      "Wildlife Conservation",
      "Pet Rescue",
    ],
  };

  const handleVolunteerTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setVolunteerType(event.target.value);
    setOrganisationType(""); // Reset org type when volunteer type changes
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload: Payload = {
      email,
      password,
      contactNo: contactNumber,
      userType,
      volType: volunteerType,
    };

    if (userType === "organisation") {
      payload.orgName = orgName;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Attempt to parse the response as JSON to get a more detailed error
        const data = await response.json();
        throw new Error(data.message || "Failed to sign up. Please try again later.");
      }

      toast.success("Sign Up successful!"); // Success toast
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred during signup.";
      console.log(err)
      toast.error(`Sign Up failed: ${errorMessage}`); // Show actual error message from backend
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-xl p-8 rounded-xl bg-white backdrop-blur-lg shadow-xl border border-white/30">
        <h2 className="text-2xl font-semibold text-center text-black mb-6">Sign Up</h2>

        {/* User Type Selector */}
        <div className="mb-6 flex justify-center space-x-6">
          <button
            onClick={() => setUserType("individual")}
            className={`py-2 px-4 rounded-md ${
              userType === "individual"
                ? "bg-blue-600 text-white"
                : "bg-transparent text-blue-600 border border-blue-600"
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => setUserType("organisation")}
            className={`py-2 px-4 rounded-md ${
              userType === "organisation"
                ? "bg-blue-600 text-white"
                : "bg-transparent text-blue-600 border border-blue-600"
            }`}
          >
            Organisation
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Password field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Contact number field */}
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-sm font-medium text-black mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter your contact number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
              required
            />
          </div>

          {/* Volunteer Type */}
          <div className="mb-4">
            <label htmlFor="volunteerType" className="block text-sm font-medium text-black mb-2">
              Volunteer Type
            </label>
            <select
              id="volunteerType"
              name="volunteerType"
              value={volunteerType}
              onChange={handleVolunteerTypeChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select volunteer type</option>
              {volunteerTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Organization Type (only if volunteer type is selected and user type is organisation) */}
          {volunteerType && userType === "organisation" && (
            <div className="mb-4">
              <label htmlFor="organizationType" className="block text-sm font-medium text-black mb-2">
                Organization Type
              </label>
              <select
                id="organizationType"
                name="organizationType"
                value={organisationType}
                onChange={(e) => setOrganisationType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select organisation type</option>
                {organisationTypes[volunteerType].map((org, index) => (
                  <option key={index} value={org}>{org}</option>
                ))}
              </select>
            </div>
          )}

          {/* Organisation Name field (only if user is an organisation) */}
          {userType === "organisation" && (
            <div className="mb-4">
              <label htmlFor="orgName" className="block text-sm font-medium text-black mb-2">
                Organisation Name
              </label>
              <input
                type="text"
                id="orgName"
                name="orgName"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Enter your organisation name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                required
              />
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default SignUpPage;
