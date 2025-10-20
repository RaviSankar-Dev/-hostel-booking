

function Facilities() {
  const facilities = [
    {
      name: "High-Speed Wi-Fi",
      img: "https://plus.unsplash.com/premium_photo-1687558345854-a07ac0be8cd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lmaXxlbnwwfHwwfHx8MA%3D%3D",
      desc: "Unlimited internet for study & entertainment.",
    },
    {
      name: "24/7 Water Supply",
      img: "https://t3.ftcdn.net/jpg/15/59/15/90/360_F_1559159048_A3haDI8lYzKOSshqqDBGq8PG0slX5OHB.jpg",
      desc: "Always available clean water.",
    },
    {
      name: "CCTV Security",
      img: "https://plus.unsplash.com/premium_photo-1681487394066-fbc71a037573?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2N0dnxlbnwwfHwwfHx8MA%3D%3D",
      desc: "Round-the-clock surveillance for safety.",
    },
    {
      name: "Washing Machine",
      img: "https://images.unsplash.com/photo-1709477542164-ae852db0d019?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdhc2hpbmclMjBtYWNoaW5lfGVufDB8fDB8fHww",
      desc: "Laundry made easy for residents.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 min-h-screen">
      {/* Diwali Header */}
      <div className="w-full text-center py-4 bg-gradient-to-r from-orange-600 via-yellow-500 to-red-600 text-white rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">🎆 Happy Diwali! 🪔</h2>
        <p className="text-sm md:text-base mt-1">May our facilities bring light and comfort to your stay</p>
      </div>
      
      <h2 className="text-4xl font-extrabold mb-12 text-center">
        <span className="bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text">
          🏠 Our Facilities 🏠
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {facilities.map((f, i) => (
          <div
            key={i}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-4 border-yellow-300"
          >
            {/* Image */}
            <img
              src={f.img}
              alt={f.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-yellow-600/30 to-transparent"></div>
            {/* Text */}
            <div className="absolute bottom-5 left-0 right-0 px-4 text-center">
              <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{f.name}</h3>
              <p className="text-yellow-100 text-sm font-medium drop-shadow-md">{f.desc}</p>
              <div className="mt-2 text-xs text-yellow-200 font-bold">
                ✨ Diwali Special ✨
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Diwali Footer */}
      <div className="text-center mt-12 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border-2 border-yellow-400">
        <p className="text-lg font-bold text-orange-600">🪔 Happy Diwali! May our facilities light up your stay with comfort and joy! 🪔</p>
      </div>
    </div>
  );
}

export default Facilities;
