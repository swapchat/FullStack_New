import AuthForm from "../components/AuthForm";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
        <AuthForm isLogin={false} />
      </div>
    </div>
  );
};

export default Register;
