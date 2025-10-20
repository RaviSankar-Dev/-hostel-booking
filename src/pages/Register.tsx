function Register() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Register</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="City/Village"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Guardian Number"
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
