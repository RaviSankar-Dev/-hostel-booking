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
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-white">

      {/* About Us Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{color: '#1e293b'}}>
          👥 About Our Team 👥
        </h1>
        <p className="text-lg font-medium max-w-3xl mx-auto" style={{color: '#64748b'}}>
          Our dedicated team of professionals brings years of experience in hospitality and student welfare to ensure you have the best possible living experience.
        </p>
      </div>

      {/* Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105" style={{border: '4px solid #4CAF50'}}>
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover shadow-lg" style={{border: '4px solid #F9A825'}}
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#FF7043'}}>
                  <span className="text-white text-sm font-bold">⭐</span>
                </div>
              </div>
            </div>

            {/* Member Info */}
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold mb-2" style={{color: '#2C3E50'}}>{member.name}</h3>
              <p className="text-lg font-semibold mb-1" style={{color: '#4CAF50'}}>{member.role}</p>
              <div className="inline-block px-4 py-2 rounded-full" style={{backgroundColor: '#F5F7FA', border: '2px solid #F9A825'}}>
                <span className="font-bold" style={{color: '#2C3E50'}}>⏰ {member.experience}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-center mb-4 leading-relaxed">
              {member.description}
            </p>

            {/* Specialties */}
            <div className="mb-4">
              <h4 className="text-sm font-bold mb-2" style={{color: '#2C3E50'}}>🎯 Specialties:</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {member.specialties.map((specialty, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium" style={{backgroundColor: '#F5F7FA', color: '#2C3E50', border: '1px solid #4CAF50'}}>
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievement */}
            <div className="p-3 rounded-lg" style={{backgroundColor: '#F5F7FA', border: '2px solid #4CAF50'}}>
              <h4 className="text-sm font-bold mb-1" style={{color: '#2C3E50'}}>🏆 Key Achievement:</h4>
              <p className="text-xs" style={{color: '#2C3E50'}}>{member.achievements}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Company Stats */}
      <div className="bg-white rounded-2xl p-8 shadow-lg" style={{border: '4px solid #FF7043'}}>
        <h2 className="text-3xl font-bold text-center mb-8" style={{color: '#2C3E50'}}>
          🏆 Our Achievements 🏆
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2" style={{color: '#4CAF50'}}>500+</div>
            <div className="font-semibold" style={{color: '#2C3E50'}}>Happy Residents</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2" style={{color: '#4CAF50'}}>8+</div>
            <div className="font-semibold" style={{color: '#2C3E50'}}>Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2" style={{color: '#4CAF50'}}>24/7</div>
            <div className="font-semibold" style={{color: '#2C3E50'}}>Support Available</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2" style={{color: '#4CAF50'}}>100%</div>
            <div className="font-semibold" style={{color: '#2C3E50'}}>Safety Record</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 p-6 bg-white rounded-xl" style={{border: '2px solid #2563eb'}}>
        <p className="text-lg font-bold" style={{color: '#2563eb'}}>Welcome to your new home!</p>
      </div>
    </div>
  );
}

export default About;
