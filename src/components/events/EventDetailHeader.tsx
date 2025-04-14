
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '@/data/mockEvents';

interface EventDetailHeaderProps {
  event: Event;
}

const EventDetailHeader: React.FC<EventDetailHeaderProps> = ({ event }) => {
  return (
    <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-xl mb-8">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <Badge className="mb-4 px-3 py-1" variant="secondary">
          <event.categoryIcon className="h-3.5 w-3.5 mr-1" />
          {event.category}
        </Badge>
        <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
        <p className="text-white/80 mb-3">{event.organizer}</p>
        
        <div className="flex flex-wrap gap-4 text-white/70">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{event.date} • {event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            <span>{event.attendees} attending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailHeader;
