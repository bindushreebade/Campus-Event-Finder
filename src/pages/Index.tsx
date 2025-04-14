
import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventList from '@/components/events/EventList';
import { 
  mockEvents, 
  getPopularEvents, 
  getUpcomingEvents,
  eventCategories,
  getEventsByCategory,
  searchEvents
} from '@/data/mockEvents';

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [popularEvents, setPopularEvents] = useState(getPopularEvents());
  const [upcomingEvents, setUpcomingEvents] = useState(getUpcomingEvents());
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial data loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let results = mockEvents;
    
    if (searchQuery) {
      results = searchEvents(searchQuery);
    } else if (selectedCategory !== 'All') {
      results = getEventsByCategory(selectedCategory);
    }
    
    setFilteredEvents(results);
  }, [searchQuery, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Campus events" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>
        
        <div className="section-container relative z-10 text-white">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Events Happening On Campus</h1>
            <p className="text-lg md:text-xl mb-8 text-white/80">
              Connect with your community, explore opportunities, and make the most of your campus experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search for events..."
                  className="w-full h-12 pl-10 pr-4 rounded-lg text-foreground bg-white/90 backdrop-blur-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              <Button size="lg" className="h-12">Find Events</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-container py-16">
        {/* Category Filter */}
        <div className="mb-12 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex space-x-2 min-w-max">
            <Button
              variant={selectedCategory === 'All' ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => handleCategoryChange('All')}
            >
              All Events
            </Button>
            
            {eventCategories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                className="rounded-full flex items-center"
                onClick={() => handleCategoryChange(category.name)}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Event Lists */}
        {searchQuery || selectedCategory !== 'All' ? (
          // Search or filtered results
          <EventList 
            events={filteredEvents} 
            title={`${selectedCategory !== 'All' ? selectedCategory : 'Search'} Results`} 
            description={`Found ${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''}`}
            emptyMessage={`No events found${searchQuery ? ` for "${searchQuery}"` : ` in ${selectedCategory}`}`}
            featuredIndex={filteredEvents.length > 3 ? 0 : undefined}
          />
        ) : (
          // Default view with sections
          <div className="space-y-16">
            {/* Popular Events Section */}
            <EventList 
              events={popularEvents} 
              title="Popular Events" 
              description="Trending events across campus with high attendance"
            />
            
            {/* Upcoming Events Section */}
            <EventList 
              events={upcomingEvents} 
              title="Upcoming This Week" 
              description="Don't miss out on these events happening soon"
              featuredIndex={2}
            />
            
            {/* All Events Section */}
            <EventList 
              events={mockEvents} 
              title="All Campus Events" 
              description="Browse all events happening on campus"
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
