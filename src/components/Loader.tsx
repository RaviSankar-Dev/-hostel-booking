function Loader() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Animated Bed */}
      <div className="flex space-x-4 mb-6 animate-bounce">
        <div className="w-12 h-6 bg-indigo-600 rounded-lg relative">
          <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
        </div>
        <div className="w-12 h-6 bg-pink-600 rounded-lg relative">
          <div className="w-4 h-4 bg-yellow-300 rounded-full absolute top-1 left-1 shadow-sm"></div>
        </div>
      </div>

      {/* Animated Food Tray */}
      <div className="w-16 h-16 border-4 border-dashed border-indigo-400 rounded-full animate-spin flex items-center justify-center">
        <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
      </div>

      <p className="mt-6 text-indigo-700 font-semibold text-lg animate-pulse">
        Loading your PG Dashboard...
      </p>
    </div>
  );
}

export default Loader;
