import { FaUser } from "react-icons/fa";
const AuthCard = ({ title, children }) => {
  return (
    <div className=" max-w-md px-12 py-12  rounded-lg   bg-white flex flex-col gap-2  justify-center items-center  shadow-md w-full">
      <FaUser className="rounded-full bg-white absolute border w-36 text-gray-800 h-36 p-4 top-[-20%]  border-gray-200" />
      <h2 className="text-xl md:text-2xl mt-8 font-bold text-black mb-6 text-center">{title}</h2>
      {children}
    </div>
  );
};

export default AuthCard;
