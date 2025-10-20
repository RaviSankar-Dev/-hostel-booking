

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
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold mb-12 text-center">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          ✨ Our Facilities
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {facilities.map((f, i) => (
          <div
            key={i}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Image */}
            <img
              src={f.img}
              alt={f.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            {/* Text */}
            <div className="absolute bottom-5 left-0 right-0 px-4 text-center">
              <h3 className="text-xl font-bold text-white mb-2">{f.name}</h3>
              <p className="text-gray-200 text-sm">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Facilities;
