import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Rooms() {
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
    </div>
  );
}

export default Rooms;
