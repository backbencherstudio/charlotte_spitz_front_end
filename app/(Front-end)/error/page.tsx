// pages/404.js (or any custom error page file like _error.js)
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Oops! Something Went Wrong
      </h1>
      <p className="text-lg text-gray-800 mb-6">
        It seems there was an issue with your request. Please try again later.
      </p>
      <p className="text-sm text-gray-600 mb-6">
        {
          "If the issue persists, feel free to contact us, and we'll assist you in resolving it."
        }
      </p>
      <Link href="/" className="text-blue-500 hover:text-blue-700 font-medium">
        Go back to homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
