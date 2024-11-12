'use client'
import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify functions and container
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Handle error responses from the backend
        const data = await response.json();
        throw new Error(data.message || "Failed to log in. Please try again.");
      }

      // Assuming the response contains a JWT token
      const data = await response.json();
      const userType = data.userType; // Replace with actual token field if different
      const email = data.email;
      const firstName = data.firstName;
      const lastName = data.lastName;
      const ID = data.ID;
      const contactNo = data.contactNo;
      const orgName = data.orgName;

      // Store the token in localStorage or cookies
      localStorage.setItem("userType", userType);
      localStorage.setItem("email", email);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("ID", ID);
      localStorage.setItem("contactNo", contactNo);
      localStorage.setItem("orgName", orgName);

      toast.success("Login successful!"); // Success toast

      // Optionally, redirect to another page
      router.push('/'); // Navigate to dashboard 

    } catch (err: any) {
      toast.error("Invalid Credentials"); // Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-6 rounded-xl bg-white shadow-md shadow-gray-700">
        <h2 className="text-2xl font-semibold text-center text-black mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-black mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>

      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
