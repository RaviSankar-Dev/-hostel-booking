

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
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-white">
      
      <h2 className="text-4xl font-extrabold mb-12 text-center">
        <span style={{color: '#1e293b'}}>
          🏠 Our Facilities 🏠
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {facilities.map((f, i) => (
          <div
            key={i}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500" style={{border: '4px solid #2563eb'}}
          >
            {/* Image */}
            <img
              src={f.img}
              alt={f.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0" style={{background: 'linear-gradient(to top, rgba(30, 41, 59, 0.8) 0%, rgba(37, 99, 235, 0.3) 50%, transparent 100%)'}}></div>
            {/* Text */}
            <div className="absolute bottom-5 left-0 right-0 px-4 text-center">
              <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{f.name}</h3>
              <p className="text-white text-sm font-medium drop-shadow-md">{f.desc}</p>
              <div className="mt-2 text-xs text-white font-bold">
                ✨ Premium Quality ✨
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* PG Tour Video Section */}
      <section className="mt-16">
        <h3 className="text-3xl font-bold text-center mb-8" style={{color: '#1e293b'}}>
          Take a Virtual Tour Through Our PGs
        </h3>
        <div className="bg-white rounded-2xl shadow-xl p-6" style={{border: '4px solid #2563eb'}}>
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <video
              className="w-full h-full object-cover"
              controls
              poster="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60"
              preload="metadata"
            >
              <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-6 text-center">
            <h4 className="text-xl font-semibold mb-3" style={{color: '#1e293b'}}>
              Experience Our 5 Premium PG Locations
            </h4>
            <p className="text-gray-600 mb-4">
              Watch as we take you on a guided tour through our different PG accommodations, 
              showcasing the variety of rooms, facilities, and amenities available.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
              {[
                { name: "PG 1" },
                { name: "PG 2" },
                { name: "PG 3" },
                { name: "PG 4" },
                { name: "PG 5" }
              ].map((pg, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg" style={{border: '2px solid #2563eb'}}>
                  <h5 className="font-bold" style={{color: '#2563eb'}}>{pg.name}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <div className="text-center mt-12 p-6 bg-white rounded-xl" style={{border: '2px solid #2563eb'}}>
        <p className="text-lg font-bold" style={{color: '#2563eb'}}>Welcome to your new home!</p>
      </div>
    </div>
  );
}

export default Facilities;
