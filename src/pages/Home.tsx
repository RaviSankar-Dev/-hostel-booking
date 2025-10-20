import { useState, useEffect } from "react";
import Loader from "../components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center text-center space-y-16 px-4 md:px-8 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 min-h-screen relative">
      {/* Left Side Firecrackers */}
      <div className="fixed left-4 top-1/4 z-10 hidden lg:block">
        <div className="text-4xl animate-bounce">🧨</div>
        <div className="text-3xl animate-pulse mt-2">💥</div>
        <div className="text-2xl animate-bounce mt-3">🎆</div>
        <div className="text-3xl animate-pulse mt-2">✨</div>
        <div className="text-2xl animate-bounce mt-3">🎇</div>
      </div>

      {/* Right Side Firecrackers */}
      <div className="fixed right-4 top-1/4 z-10 hidden lg:block">
        <div className="text-4xl animate-bounce">🧨</div>
        <div className="text-3xl animate-pulse mt-2">💥</div>
        <div className="text-2xl animate-bounce mt-3">🎆</div>
        <div className="text-3xl animate-pulse mt-2">✨</div>
        <div className="text-2xl animate-bounce mt-3">🎇</div>
      </div>

      {/* Mobile Firecrackers - Top */}
      <div className="absolute top-2 left-2 z-10 lg:hidden">
        <div className="text-2xl animate-bounce">🧨</div>
        <div className="text-xl animate-pulse">💥</div>
      </div>
      <div className="absolute top-2 right-2 z-10 lg:hidden">
        <div className="text-2xl animate-bounce">🎆</div>
        <div className="text-xl animate-pulse">✨</div>
      </div>

      {/* Diwali Header */}
      <div className="w-full text-center py-4 bg-gradient-to-r from-orange-600 via-yellow-500 to-red-600 text-white rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold">🎆 Happy Diwali! 🪔</h2>
        <p className="text-sm md:text-base mt-1">May this festival of lights bring joy and prosperity to your home</p>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-xl border-4 border-yellow-400">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="PG Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-yellow-500/30 to-red-600/30"></div>
        <div className="relative z-10 px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
            🏠 Welcome to Gayatri Ladies Hostel 🏠
          </h1>
          <p className="text-md md:text-lg mb-6 max-w-3xl mx-auto text-white drop-shadow-md font-medium">
            Affordable, safe, and homely accommodation for students & working professionals.
            <br />
            <span className="text-yellow-200">✨ Special Diwali offers available! ✨</span>
          </p>

          {/* Explore Rooms Button */}
          <div className="relative inline-block">
            <a
              href="/rooms"
              className="relative inline-block px-8 py-3 font-bold group"
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-gradient-to-r from-yellow-500 to-orange-500 group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg"></span>
              <span className="absolute inset-0 w-full h-full bg-yellow-100 border-2 border-orange-500 rounded-lg"></span>
              <span className="relative text-orange-800 group-hover:text-white font-bold">🪔 Explore Rooms 🪔</span>
            </a>

            {/* Diwali Diya Animation */}
            <div className="absolute -top-8 -right-8 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <div className="text-2xl">🪔</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">🏡 Take a Virtual Tour 🏡</h2>
        <div className="w-full h-[320px] md:h-[360px] rounded-xl overflow-hidden shadow-lg border-4 border-yellow-400 mx-auto">
          <iframe
            className="w-full h-full"
            src="https://user-gen-media-assets.s3.amazonaws.com/veo_videos/83167a33-f5f5-43d9-8ead-aa36a29ad22f.mp4"
            title="PG Tour"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {[ 
          { title: "🏠 Comfortable Rooms", desc: "Spacious, well-ventilated, fully furnished rooms for a cozy stay.", color: "from-orange-50 to-yellow-100", emoji: "🏠" },
          { title: "🍛 Healthy Food", desc: "Nutritious meals prepared fresh daily with variety.", color: "from-yellow-50 to-orange-100", emoji: "🍛" },
          { title: "🔒 Secure Stay", desc: "CCTV surveillance & a safe environment for peace of mind.", color: "from-red-50 to-orange-100", emoji: "🔒" }
        ].map((item, i) => (
          <div key={i} className={`p-6 bg-gradient-to-br ${item.color} shadow-lg rounded-xl hover:scale-105 transition duration-300 border-2 border-yellow-300`}>
            <div className="text-4xl mb-3">{item.emoji}</div>
            <h3 className="text-2xl font-bold mb-2 text-orange-800">{item.title}</h3>
            <p className="text-orange-700 font-medium">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">🌟 Why Choose Gayatri Ladies Hostel? 🌟</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {[ 
            { title: "✅ Prime Location", desc: "Easy access to colleges, offices, and public transport.", emoji: "📍" },
            { title: "✅ Affordable Rent", desc: "Flexible pricing with no compromise on quality & comfort.", emoji: "💰" },
            { title: "✅ Community Living", desc: "Friendly environment where students and professionals connect.", emoji: "👥" },
            { title: "✅ 24/7 Support", desc: "Always available for assistance and resolving complaints quickly.", emoji: "🛟" }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg rounded-lg border-2 border-yellow-300 hover:shadow-xl transition">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{item.emoji}</span>
                <h4 className="font-bold text-lg text-orange-800">{item.title}</h4>
              </div>
              <p className="text-orange-700 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Details */}
      <section className="w-full max-w-4xl mx-auto bg-gradient-to-br from-orange-100 to-yellow-100 p-6 rounded-xl shadow-lg border-2 border-yellow-400 space-y-2">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">📞 Contact Us 📞</h2>
        <div className="space-y-2 text-orange-800 font-medium">
          <p><strong>📱 Phone:</strong> +91 98765 43210</p>
          <p><strong>📧 Email:</strong> contact@gayatriladieshostel.com</p>
          <p className="text-center mt-4 text-lg font-bold text-orange-600">🪔 Happy Diwali! May your home be filled with light and joy! 🪔</p>
        </div>
      </section>
    </div>
  );
}
