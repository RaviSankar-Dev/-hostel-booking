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
    <div className="flex flex-col items-center text-center space-y-16 px-4 md:px-8 bg-white min-h-screen">

      {/* Hero Section */}
      <section className="relative w-full h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-xl" style={{border: '4px solid #2563eb'}}>
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="PG Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg text-white">
            Welcome to Gayatri Ladies Hostel
          </h1>
          <p className="text-md md:text-lg mb-6 max-w-3xl mx-auto text-white drop-shadow-md font-medium">
            Affordable, safe, and homely accommodation for students & working professionals.
            <br />
            <span className="text-yellow-200">Quality accommodation with modern amenities</span>
          </p>

          {/* Explore Rooms Button */}
          <div className="relative inline-block">
            <a
              href="/rooms"
              className="inline-block px-8 py-4 text-white font-bold rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
              style={{backgroundColor: '#2563eb'}}
              onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#2563eb'}
            >
              Explore Rooms
            </a>
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4" style={{color: '#1e293b'}}>Take a Virtual Tour</h2>
        <div className="w-full h-[320px] md:h-[360px] rounded-xl overflow-hidden shadow-lg mx-auto" style={{border: '4px solid #2563eb'}}>
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
          { title: "Comfortable Rooms", desc: "Spacious, well-ventilated, fully furnished rooms for a cozy stay.", emoji: "🏠" },
          { title: "Healthy Food", desc: "Nutritious meals prepared fresh daily with variety.", emoji: "🍛" },
          { title: "Secure Stay", desc: "CCTV surveillance & a safe environment for peace of mind.", emoji: "🔒" }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-white shadow-lg rounded-xl hover:scale-105 transition duration-300" style={{border: '2px solid #2563eb'}}>
            <div className="text-4xl mb-3">{item.emoji}</div>
            <h3 className="text-2xl font-bold mb-2" style={{color: '#1e293b'}}>{item.title}</h3>
            <p className="font-medium" style={{color: '#64748b'}}>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-6" style={{color: '#1e293b'}}>Why Choose Gayatri Ladies Hostel?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {[ 
            { title: "Prime Location", desc: "Easy access to colleges, offices, and public transport.", emoji: "📍" },
            { title: "Affordable Rent", desc: "Flexible pricing with no compromise on quality & comfort.", emoji: "💰" },
            { title: "Community Living", desc: "Friendly environment where students and professionals connect.", emoji: "👥" },
            { title: "24/7 Support", desc: "Always available for assistance and resolving complaints quickly.", emoji: "🛟" }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition" style={{border: '2px solid #2563eb'}}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{item.emoji}</span>
                <h4 className="font-bold text-lg" style={{color: '#1e293b'}}>{item.title}</h4>
              </div>
              <p className="font-medium" style={{color: '#64748b'}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Details */}
      <section className="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-2" style={{border: '2px solid #2563eb'}}>
        <h2 className="text-3xl font-bold mb-4" style={{color: '#1e293b'}}>Contact Us</h2>
        <div className="space-y-2 font-medium" style={{color: '#64748b'}}>
          <p><strong>📱 Phone:</strong> <a href="tel:+918143223993" className="underline font-bold transition-colors" style={{color: '#2563eb'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#1d4ed8'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#2563eb'}>+91 8143223993</a></p>
          <p><strong>📧 Email:</strong> contact@gayatriladieshostel.com</p>
          <p className="text-center mt-4 text-lg font-bold" style={{color: '#2563eb'}}>Welcome to your new home!</p>
        </div>
      </section>
    </div>
  );
}
