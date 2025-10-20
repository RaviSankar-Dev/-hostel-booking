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
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
        Our Rooms
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
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
              <img
                src={room.img}
                alt={room.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {room.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Comfortable & Spacious
                </p>
                <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                  View Details
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Location Map */}
      <section className="mt-16">
        <h3 className="text-3xl font-bold mb-4 text-gray-800 text-center">Find Us</h3>
        <p className="text-center text-gray-600 mb-6">{address}</p>
        <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg border">
          <iframe
            className="w-full h-full"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Govind%20rajula%20naidu%20street%2C%20Nakkala%20Rd%2C%20Suryarao%20Pet%2C%20Vijayawada%2C%20Andhra%20Pradesh%20520002&output=embed"
            title="Ravi PG Location"
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
          <a
            href="https://maps.app.goo.gl/9jVRLUemnfhfBJfR8?g_st=aw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Open in Google Maps
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(address);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 border transition"
            aria-label="Copy address"
          >
            {copied ? "Copied!" : "Copy Address"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default Rooms;
