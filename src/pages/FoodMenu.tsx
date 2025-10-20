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
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-yellow-500 to-red-500 text-transparent bg-clip-text">
        🍴 Weekly Food Menu
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menu.map((dayMenu, index) => (
          <div
            key={index}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <img
              src={dayMenu.img}
              alt={dayMenu.day}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-5 left-0 right-0 px-4 text-center text-white">
              <h3 className="text-xl font-bold mb-1">{dayMenu.day}</h3>
              <p className="text-sm">
                <strong>Breakfast:</strong> {dayMenu.items.breakfast}<br/>
                <strong>Lunch:</strong> {dayMenu.items.lunch}<br/>
                <strong>Dinner:</strong> {dayMenu.items.dinner}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodMenu;
