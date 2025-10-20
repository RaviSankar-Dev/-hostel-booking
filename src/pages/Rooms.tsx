import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Rooms() {
  const [copied, setCopied] = useState(false);
  const address = "Govind rajula naidu street, Nakkala Rd, Suryarao Pet, Vijayawada, Andhra Pradesh 520002";
  const rooms = [
    {
      name: "Single Sharing Room",
      img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    },
    {
      name: "Double Sharing Room",
      img: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      name: "Triple Sharing Room",
      img: "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg",
    },
    {
      name: "Four Sharing Room",
      img: "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg",
    },
    {
      name: "Five Sharing Room",
      img: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
    },
    {
      name: "Six Sharing Room",
      img: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 min-h-screen">
      {/* Diwali Header */}
      <div className="w-full text-center py-4 bg-gradient-to-r from-orange-600 via-yellow-500 to-red-600 text-white rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">🎆 Happy Diwali! 🪔</h2>
        <p className="text-sm md:text-base mt-1">Special Diwali offers on room bookings!</p>
      </div>
      
      <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
        🏠 Our Rooms 🏠
      </h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {rooms.map((room, i) => (
          <SwiperSlide key={i}>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border-2 border-yellow-300">
              <img
                src={room.img}
                alt={room.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-orange-800">
                  🏠 {room.name}
                </h3>
                <p className="text-sm text-orange-600 mt-1 font-medium">
                  ✨ Comfortable & Spacious ✨
                </p>
                <div className="mt-2 text-xs text-yellow-600 font-bold">
                  🪔 Diwali Special Offer Available! 🪔
                </div>
                <button className="mt-3 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition font-bold">
                  🪔 View Details 🪔
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Location Map */}
      <section className="mt-16">
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent text-center">📍 Find Us 📍</h3>
        <p className="text-center text-orange-700 mb-6 font-medium">🏠 {address} 🏠</p>
        <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg border-4 border-yellow-400">
          <iframe
            className="w-full h-full"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Govind%20rajula%20naidu%20street%2C%20Nakkala%20Rd%2C%20Suryarao%20Pet%2C%20Vijayawada%2C%20Andhra%20Pradesh%20520002&output=embed"
            title="Gayatri Ladies Hostel Location"
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
          <a
            href="https://maps.app.goo.gl/9jVRLUemnfhfBJfR8?g_st=aw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition font-bold"
          >
            🗺️ Open in Google Maps
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(address);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-lg hover:from-yellow-200 hover:to-orange-200 border-2 border-yellow-400 transition font-bold"
            aria-label="Copy address"
          >
            {copied ? "📋 Copied!" : "📋 Copy Address"}
          </button>
        </div>
        <div className="text-center mt-6">
          <p className="text-lg font-bold text-orange-600">🪔 Happy Diwali! May your journey to our PG be filled with light and joy! 🪔</p>
        </div>
      </section>
    </div>
  );
}

export default Rooms;
