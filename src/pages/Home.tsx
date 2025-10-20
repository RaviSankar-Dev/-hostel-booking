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
    <div className="flex flex-col items-center text-center space-y-16 px-4 md:px-8">

      {/* Hero Section */}
      <section className="relative w-full h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="PG Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-90"
        />
        <div className="relative z-10 px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Welcome to Ravi PG
          </h1>
          <p className="text-md md:text-lg mb-6 max-w-3xl mx-auto text-white drop-shadow-md">
            Affordable, safe, and homely accommodation for students & working professionals.
          </p>

          {/* Explore Rooms Button */}
          <div className="relative inline-block">
            <a
              href="/rooms"
              className="relative inline-block px-8 py-3 font-bold group"
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black rounded-lg"></span>
              <span className="relative text-black group-hover:text-white">Explore Rooms</span>
            </a>

            {/* Animated PG vibe */}
            <div className="absolute -top-8 -right-8 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <div className="w-6 h-6 bg-white rounded-full shadow-inner"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">🏡 Take a Virtual Tour</h2>
        <div className="w-full h-[320px] md:h-[360px] rounded-xl overflow-hidden shadow-lg border mx-auto">
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
          { title: "🏠 Comfortable Rooms", desc: "Spacious, well-ventilated, fully furnished rooms for a cozy stay.", color: "from-blue-50 to-blue-100" },
          { title: "🍛 Healthy Food", desc: "Nutritious meals prepared fresh daily with variety.", color: "from-yellow-50 to-yellow-100" },
          { title: "🔒 Secure Stay", desc: "CCTV surveillance & a safe environment for peace of mind.", color: "from-green-50 to-green-100" }
        ].map((item, i) => (
          <div key={i} className={`p-6 bg-gradient-to-br ${item.color} shadow-md rounded-xl hover:scale-105 transition duration-300`}>
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-6">🌟 Why Choose Ravi PG?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {[ 
            { title: "✅ Prime Location", desc: "Easy access to colleges, offices, and public transport." },
            { title: "✅ Affordable Rent", desc: "Flexible pricing with no compromise on quality & comfort." },
            { title: "✅ Community Living", desc: "Friendly environment where students and professionals connect." },
            { title: "✅ 24/7 Support", desc: "Always available for assistance and resolving complaints quickly." }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white shadow rounded-lg">
              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Details */}
      <section className="w-full max-w-4xl mx-auto bg-gray-100 p-6 rounded-xl shadow space-y-2">
        <h2 className="text-3xl font-bold mb-4">📞 Contact Us</h2>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Email:</strong> contact@ravipg.com</p>
      </section>
    </div>
  );
}
