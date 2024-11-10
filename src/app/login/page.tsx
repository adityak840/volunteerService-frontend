const LoginPage = () => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-full max-w-md p-6 rounded-xl bg-white shadow-md shadow-gray-700">
          <h2 className="text-2xl font-semibold text-center text-black mb-6">Login</h2>
          
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
  
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-black mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
  
            <button 
              type="submit" 
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  export default LoginPage;
  