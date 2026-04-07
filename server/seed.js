const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

dotenv.config();

const events = [
  {
    title: "Global Tech Summit 2026",
    description: "Join industry leaders for a 3-day deep dive into the future of AI, Quantum Computing, and Sustainable Energy solutions.",
    date: new Date("2026-05-15"),
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1540575861501-7ad05823c951?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
  },
  {
    title: "Live: JavaScript Mastery Workshop",
    description: "Interactive session on advanced React patterns, performance optimization, and the latest TC39 proposals.",
    date: new Date(),
    status: "live",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
  },
  {
    title: "Design Systems Expo 2025",
    description: "A look back at the most influential design systems of the past year and how they shaped the modern web.",
    date: new Date("2025-12-10"),
    status: "past",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
  },
  {
    title: "Cyber Security Hackathon",
    description: "48-hour intense competition focused on finding vulnerabilities in modern cloud architectures.",
    date: new Date("2026-06-20"),
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
  },
  {
    title: "Sustainable Living Workshop",
    description: "Learning the basics of zero-waste lifestyles and sustainable home systems in this live session.",
    date: new Date(),
    status: "live",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");
    
    await Event.deleteMany({});
    console.log("Cleared old events.");
    
    await Event.insertMany(events);
    console.log("Events Seeded Successfully!");
    
    process.exit();
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedDB();
