import React, { useEffect } from "react";
import { FaMapMarkedAlt, FaBell, FaLightbulb } from "react-icons/fa";

const Notice = () => {
  useEffect(() => {
    document.title = "Notice & Updates | WhereIsIt";
  }, []);

  const notices = [
    {
      id: 1,
      title: "🗺️ New Map Feature Added!",
      date: "October 22, 2025",
      icon: <FaMapMarkedAlt className="text-blue-500 text-3xl" />,
      description:
        "You can now view every lost or found item directly on a live map! Each item's location is automatically detected and shown with an interactive marker. This helps users identify where an item was found or lost more easily.",
    },
    {
      id: 2,
      title: "📢 Notice System Launched",
      date: "October 22, 2025",
      icon: <FaBell className="text-yellow-500 text-3xl" />,
      description:
        "We’ve added this new Notice page to keep you updated about all feature improvements, bug fixes, and announcements. Check back here regularly for updates.",
    },
    {
      id: 3,
      title: "💡 Upcoming: Smart AI Assistant (Coming Soon!)",
      date: "October 25, 2025",
      icon: <FaLightbulb className="text-green-500 text-3xl" />,
      description:
        "We’re working on integrating an AI chatbot that can help you find items, answer your questions, and guide you around the app more easily. Stay tuned!",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-40 mb-20  px-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">
        📢 Latest Announcements & Updates
      </h1>

      <div className="space-y-8">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl p-6 flex items-start gap-5 hover:shadow-xl transition-all"
          >
            <div>{notice.icon}</div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {notice.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{notice.date}</p>
              <p className="text-gray-700 leading-relaxed">
                {notice.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;
