import { useState, useEffect } from "react";

interface FoodItem {
  breakfast: string;
  lunch: string;
  dinner: string;
}

function FoodMenu() {
  const [menu, setMenu] = useState<{ day: string; items: FoodItem; img: string }[]>([]);

  const defaultImages = [
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg",
    "https://images.pexels.com/photos/954677/pexels-photo-954677.jpeg",
    "https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg",
    "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg",
    "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg",
    "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg",
  ];

  useEffect(() => {
    // Load structured menu from localStorage
    const savedMenu: { [day: string]: FoodItem } = JSON.parse(localStorage.getItem("foodMenu") || "{}");

    if (Object.keys(savedMenu).length === 0) {
      // Default menu if none exists
      const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
      const defaultMenu = days.map((day, i) => ({
        day,
        items: { breakfast: "-", lunch: "-", dinner: "-" },
        img: defaultImages[i] || defaultImages[0],
      }));
      setMenu(defaultMenu);
    } else {
      // Convert saved menu to array with images
      const days = Object.keys(savedMenu);
      const dynamicMenu = days.map((day, i) => ({
        day,
        items: savedMenu[day],
        img: defaultImages[i] || defaultImages[0],
      }));
      setMenu(dynamicMenu);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 min-h-screen relative">
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
      <div className="w-full text-center py-4 bg-gradient-to-r from-orange-600 via-yellow-500 to-red-600 text-white rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">🎆 Happy Diwali! 🪔</h2>
        <p className="text-sm md:text-base mt-1">May our delicious food bring joy to your celebrations</p>
      </div>
      
      <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text">
        🍛 Weekly Food Menu 🍛
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menu.map((dayMenu, index) => (
          <div
            key={index}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-4 border-yellow-300"
          >
            <img
              src={dayMenu.img}
              alt={dayMenu.day}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-yellow-600/30 to-transparent"></div>
            <div className="absolute bottom-5 left-0 right-0 px-4 text-center">
              <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{dayMenu.day}</h3>
              <p className="text-sm font-medium drop-shadow-md">
                <strong className="text-yellow-200">🍳 Breakfast:</strong> <span className="text-yellow-100">{dayMenu.items.breakfast}</span><br/>
                <strong className="text-yellow-200">🍽️ Lunch:</strong> <span className="text-yellow-100">{dayMenu.items.lunch}</span><br/>
                <strong className="text-yellow-200">🍴 Dinner:</strong> <span className="text-yellow-100">{dayMenu.items.dinner}</span>
              </p>
              <div className="mt-2 text-xs text-yellow-200 font-bold">
                ✨ Diwali Special Menu ✨
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Diwali Footer */}
      <div className="text-center mt-12 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border-2 border-yellow-400">
        <p className="text-lg font-bold text-orange-600">🪔 Happy Diwali! May our delicious food light up your celebrations with joy and flavor! 🪔</p>
      </div>
    </div>
  );
}

export default FoodMenu;
