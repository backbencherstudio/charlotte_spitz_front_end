"use client";

function GoogleAuth() {
  // const handleGoogleLogin = () => {
  //   // Directly redirect to backend OAuth endpoint
  //   // The backend will handle the OAuth flow and redirect to Google
  //   window.location.href = `${URL}/api/auth/google`;
  // }
  const fetchGoogleLogin = async () => {
    try {
      window.location.href = `https://backend.cvdigger.com/api/auth/google`;
    } catch (error) {
      console.log("google login error", error);
    }
  };
  // useEffect(() => {
  //   fetchGoogleLogin()
  // }, [])
  return (
    <div>
      <div className="flex text-blackColor text-sm gap-4 ">
        <button
          onClick={fetchGoogleLogin}
          className="flex justify-center cursor-pointer items-center gap-2  w-full border border-[#E9E9EA] px-4 py-3 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <g clipPath="url(#clip0_5471_8826)">
              <path
                d="M20.7405 10.1871C20.7405 9.36773 20.6724 8.7698 20.5252 8.14972H10.9492V11.848H16.5701C16.4568 12.7671 15.8448 14.1512 14.4849 15.0813L14.4659 15.2051L17.4936 17.497L17.7034 17.5174C19.6298 15.779 20.7405 13.2211 20.7405 10.1871Z"
                fill="#4285F4"
              />
              <path
                d="M10.9512 19.9312C13.7049 19.9312 16.0167 19.0453 17.7053 17.5173L14.4869 15.0812C13.6256 15.6681 12.4697 16.0777 10.9512 16.0777C8.25406 16.0777 5.96492 14.3393 5.14891 11.9365L5.0293 11.9464L1.88102 14.3271L1.83984 14.439C3.51703 17.6944 6.96211 19.9312 10.9512 19.9312Z"
                fill="#27A376"
              />
              <path
                d="M5.14695 11.9366C4.93164 11.3166 4.80703 10.6521 4.80703 9.96565C4.80703 9.27909 4.93164 8.61474 5.13562 7.99466L5.12992 7.8626L1.94219 5.44366L1.83789 5.49214C1.14664 6.84305 0.75 8.36008 0.75 9.96565C0.75 11.5712 1.14664 13.0882 1.83789 14.4391L5.14695 11.9366Z"
                fill="#FBBC05"
              />
              <path
                d="M10.9512 3.85336C12.8663 3.85336 14.1582 4.66168 14.8948 5.33718L17.7733 2.59107C16.0055 0.985496 13.7049 0 10.9512 0C6.96211 0 3.51703 2.23672 1.83984 5.49214L5.13758 7.99466C5.96492 5.59183 8.25406 3.85336 10.9512 3.85336Z"
                fill="#EB4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_5471_8826">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.75)"
                />
              </clipPath>
            </defs>
          </svg>
          Google
        </button>
      </div>
    </div>
  );
}

export default GoogleAuth;
