
import React, { useState } from 'react';
import { User, Calendar, CheckCircle, Clock, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockEvents, Event } from '@/data/mockEvents';
import EventCard from '@/components/events/EventCard';

interface UserProfileProps {
  userId?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Mock user data
  const userData = {
    id: userId || '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    joinedDate: 'September 2023',
    avatarUrl: 'https://i.pravatar.cc/300?img=68',
    bio: 'Computer Science major. Tennis player. Coffee enthusiast.',
    interests: ['Technology', 'Sports', 'Music', 'Arts'],
  };

  // Mock user events data
  const userEvents = {
    upcoming: mockEvents.slice(0, 3),
    past: mockEvents.slice(3, 6),
    saved: mockEvents.slice(6),
  };

  return (
    <div className="animate-fade-in">
      <div className="glass-card p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white shadow-md overflow-hidden flex-shrink-0">
            <img 
              src={userData.avatarUrl} 
              alt={userData.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{userData.name}</h1>
            <p className="text-muted-foreground mb-3">{userData.email}</p>
            <p className="mb-4">{userData.bio}</p>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              {userData.interests.map((interest, index) => (
                <div 
                  key={index} 
                  className="text-xs py-1 px-3 rounded-full bg-secondary text-secondary-foreground"
                >
                  {interest}
                </div>
              ))}
            </div>
            
            <div className="text-sm text-muted-foreground">
              Member since {userData.joinedDate}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium">My Events</h2>
          <Button>Create New Event</Button>
        </div>
        
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Past Events
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Saved Events
            </TabsTrigger>
          </TabsList>

          <EventListTab 
            events={userEvents.upcoming} 
            emptyMessage="You don't have any upcoming events." 
            isVisible={activeTab === 'upcoming'} 
          />
          
          <EventListTab 
            events={userEvents.past} 
            emptyMessage="You haven't attended any events yet." 
            isVisible={activeTab === 'past'} 
          />
          
          <EventListTab 
            events={userEvents.saved} 
            emptyMessage="You haven't saved any events yet." 
            isVisible={activeTab === 'saved'} 
          />
        </Tabs>
      </div>
    </div>
  );
};

interface EventListTabProps {
  events: Event[];
  emptyMessage: string;
  isVisible: boolean;
}

const EventListTab: React.FC<EventListTabProps> = ({ events, emptyMessage, isVisible }) => {
  return (
    <TabsContent value={isVisible ? (events.length > 0 ? 'active' : 'empty') : 'inactive'} className="mt-0">
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={event.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">{emptyMessage}</p>
          <Button variant="outline" className="mt-4">Browse Events</Button>
        </div>
      )}
    </TabsContent>
  );
};

export default UserProfile;
