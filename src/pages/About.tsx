import { useState, useEffect } from "react";
import Loader from "../components/Loader";

function About() {
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  const teamMembers = [
    {
      name: "anjaneyalu",
      role: "Founder & Director",
      experience: "8+ Years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: "Passionate about providing safe and comfortable accommodation for women. With 8+ years in hospitality management, anjaneyalu ensures every resident feels at home.",
      specialties: ["Hostel Management", "Student Welfare", "Community Building"],
      achievements: "Successfully managed 5+ hostels across the city"
    },
    {
      name: " chinni vara prasad",
      role: "Operations Manager",
      experience: "6+ Years",
      image: "https://i.imghippo.com/files/LWZ1874SGE.png",
      description: "Dedicated to maintaining high standards of cleanliness and security. vara prasad brings her expertise in operations management to ensure smooth hostel operations.",
      specialties: ["Operations Management", "Security Systems", "Quality Assurance"],
      achievements: "Implemented 24/7 security systems and CCTV monitoring"
    },
    {
      name: "shivani",
      role: "Student Relations Manager",
      experience: "5+ Years",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      description: "Focused on student welfare and community building. shivani ensures every resident has a positive and supportive living experience.",
      specialties: ["Student Counseling", "Event Management", "Community Relations"],
      achievements: "Organized 50+ community events and student activities"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 min-h-screen relative">
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
        <p className="text-sm md:text-base mt-1">Meet our amazing team who make Gayatri Ladies Hostel a home away from home</p>
      </div>

      {/* About Us Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          👥 About Our Team 👥
        </h1>
        <p className="text-lg text-orange-700 font-medium max-w-3xl mx-auto">
          Our dedicated team of professionals brings years of experience in hospitality and student welfare to ensure you have the best possible living experience.
        </p>
      </div>

      {/* Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-xl border-4 border-yellow-300 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">⭐</span>
                </div>
              </div>
            </div>

            {/* Member Info */}
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-orange-800 mb-2">{member.name}</h3>
              <p className="text-lg font-semibold text-orange-600 mb-1">{member.role}</p>
              <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full border-2 border-yellow-400">
                <span className="text-orange-700 font-bold">⏰ {member.experience}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-center mb-4 leading-relaxed">
              {member.description}
            </p>

            {/* Specialties */}
            <div className="mb-4">
              <h4 className="text-sm font-bold text-orange-700 mb-2">🎯 Specialties:</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {member.specialties.map((specialty, idx) => (
                  <span key={idx} className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium border border-yellow-300">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievement */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border-2 border-yellow-200">
              <h4 className="text-sm font-bold text-orange-700 mb-1">🏆 Key Achievement:</h4>
              <p className="text-xs text-orange-600">{member.achievements}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Company Stats */}
      <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-8 border-4 border-yellow-300 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          🏆 Our Achievements 🏆
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
            <div className="text-orange-700 font-semibold">Happy Residents</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">8+</div>
            <div className="text-orange-700 font-semibold">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-orange-700 font-semibold">Support Available</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
            <div className="text-orange-700 font-semibold">Safety Record</div>
          </div>
        </div>
      </div>

      {/* Diwali Footer */}
      <div className="text-center mt-12 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border-2 border-yellow-400">
        <p className="text-lg font-bold text-orange-600">🪔 Happy Diwali! May our team continue to light up your lives with care and dedication! 🪔</p>
      </div>
    </div>
  );
}

export default About;
