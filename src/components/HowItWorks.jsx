import React from "react";
import { FaSearch, FaBullhorn, FaHandshake } from "react-icons/fa";

const cards = [
  {
    icon: FaBullhorn,
    title: "Post an Item",
    description:
      "Lost or found something? Easily post the item with a description and image.",
  },
  {
    icon: FaSearch,
    title: "Search Listings",
    description:
      "Browse lost and found listings to check if someone has posted your item or needs help.",
  },
  {
    icon: FaHandshake,
    title: "Connect & Reunite",
    description:
      "Message the finder or owner securely through our platform and reclaim your belongings.",
  },
];

const HowItWorks = () => {
  return (
    <section className="mt-40 px-4 ">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-20 text-base-content">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-8 text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-cyan-400 to-blue-500"
              >
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full text-blue-600 bg-white bg-opacity-20 text-3xl mb-6">
                  <Icon />
                </div>
                <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                <p className="text-white/90">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
