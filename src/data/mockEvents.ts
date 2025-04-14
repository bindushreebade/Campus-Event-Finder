
import { Calendar, Users, Palette, BookOpen, Code, Music, Trophy, Heart, Coffee } from "lucide-react";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: string;
  categoryIcon: any;
  imageUrl: string;
  attendees: number;
  capacity: number;
  isPopular: boolean;
}

// Helper function to create dates within the next 30 days
const getRandomFutureDate = () => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);
  return futureDate.toISOString().split('T')[0];
};

// Categories with their corresponding icons
const categories = [
  { name: "Academic", icon: BookOpen },
  { name: "Technology", icon: Code },
  { name: "Arts", icon: Palette },
  { name: "Music", icon: Music },
  { name: "Social", icon: Coffee },
  { name: "Sports", icon: Trophy },
  { name: "Charity", icon: Heart },
];

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Annual Tech Summit",
    description: "Join us for the biggest tech event of the year featuring industry leaders and innovative workshops. Network with peers and learn about cutting-edge technologies.",
    date: getRandomFutureDate(),
    time: "10:00 AM - 4:00 PM",
    location: "Main Campus, Technology Building",
    organizer: "Computer Science Department",
    category: "Technology",
    categoryIcon: Code,
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    attendees: 120,
    capacity: 150,
    isPopular: true,
  },
  {
    id: "2",
    title: "Spring Music Festival",
    description: "Experience an evening of incredible music performances from student musicians and special guests. From classical to contemporary, there's something for everyone.",
    date: getRandomFutureDate(),
    time: "7:00 PM - 11:00 PM",
    location: "Campus Amphitheater",
    organizer: "Music Department",
    category: "Music",
    categoryIcon: Music,
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    attendees: 230,
    capacity: 300,
    isPopular: true,
  },
  {
    id: "3",
    title: "International Food Fair",
    description: "Taste cuisines from around the world prepared by student cultural clubs. A celebration of diversity through food, music, and cultural performances.",
    date: getRandomFutureDate(),
    time: "12:00 PM - 3:00 PM",
    location: "Student Center Plaza",
    organizer: "International Student Association",
    category: "Social",
    categoryIcon: Coffee,
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    attendees: 185,
    capacity: 200,
    isPopular: true,
  },
  {
    id: "4",
    title: "Research Symposium",
    description: "Undergraduate and graduate students showcase their research projects. An opportunity to see innovative ideas and connect with faculty mentors.",
    date: getRandomFutureDate(),
    time: "9:00 AM - 5:00 PM",
    location: "Science Center, Grand Hall",
    organizer: "Office of Research",
    category: "Academic",
    categoryIcon: BookOpen,
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    attendees: 90,
    capacity: 120,
    isPopular: false,
  },
  {
    id: "5",
    title: "Charity 5K Run",
    description: "Run for a cause! Proceeds support local education initiatives. All fitness levels welcome, with prizes for top finishers.",
    date: getRandomFutureDate(),
    time: "8:00 AM - 11:00 AM",
    location: "Campus Track & Field",
    organizer: "Student Athletics",
    category: "Sports",
    categoryIcon: Trophy,
    imageUrl: "https://images.unsplash.com/photo-1533733381005-d08367525999?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    attendees: 75,
    capacity: 150,
    isPopular: false,
  },
  {
    id: "6",
    title: "Art Exhibition Opening",
    description: "Featuring works from talented student artists across all mediums. Opening night includes refreshments and artist talks.",
    date: getRandomFutureDate(),
    time: "6:00 PM - 9:00 PM",
    location: "Fine Arts Gallery",
    organizer: "Art Department",
    category: "Arts",
    categoryIcon: Palette,
    imageUrl: "https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    attendees: 45,
    capacity: 100,
    isPopular: false,
  },
  {
    id: "7",
    title: "Career Fair",
    description: "Meet representatives from top companies looking to hire students and recent graduates. Bring your resume and dress professionally.",
    date: getRandomFutureDate(),
    time: "11:00 AM - 3:00 PM",
    location: "Business School Atrium",
    organizer: "Career Services",
    category: "Academic",
    categoryIcon: BookOpen,
    imageUrl: "https://images.unsplash.com/photo-1599824794872-12ad05c69dc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    attendees: 160,
    capacity: 200,
    isPopular: true,
  },
  {
    id: "8",
    title: "Hackathon Challenge",
    description: "48 hours to build innovative solutions to real-world problems. Great for networking, learning, and showing off your skills.",
    date: getRandomFutureDate(),
    time: "Starting at 5:00 PM",
    location: "Innovation Hub",
    organizer: "Engineering Club",
    category: "Technology",
    categoryIcon: Code,
    imageUrl: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    attendees: 85,
    capacity: 100,
    isPopular: false,
  },
];

// All available categories for filtering
export const eventCategories = categories;

// Function to get upcoming events (next 7 days)
export const getUpcomingEvents = () => {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  return mockEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate <= nextWeek;
  });
};

// Function to get popular events (based on attendee ratio)
export const getPopularEvents = () => {
  return mockEvents
    .filter(event => event.attendees / event.capacity > 0.7)
    .sort((a, b) => (b.attendees / b.capacity) - (a.attendees / a.capacity))
    .slice(0, 4);
};

// Function to filter events by category
export const getEventsByCategory = (category: string) => {
  if (category === "All") return mockEvents;
  return mockEvents.filter(event => event.category === category);
};

// Function to search events
export const searchEvents = (query: string) => {
  const lowerCaseQuery = query.toLowerCase();
  return mockEvents.filter(
    event => 
      event.title.toLowerCase().includes(lowerCaseQuery) ||
      event.description.toLowerCase().includes(lowerCaseQuery) ||
      event.location.toLowerCase().includes(lowerCaseQuery) ||
      event.organizer.toLowerCase().includes(lowerCaseQuery)
  );
};

// Function to get a single event by ID
export const getEventById = (id: string) => {
  return mockEvents.find(event => event.id === id);
};
