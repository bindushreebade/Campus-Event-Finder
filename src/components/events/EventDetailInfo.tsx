
import React from 'react';
import { Calendar, MapPin, User, Clock } from 'lucide-react';
import { Event } from '@/data/mockEvents';

interface EventDetailInfoProps {
  event: Event;
}

const EventDetailInfo: React.FC<EventDetailInfoProps> = ({ event }) => {
  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-medium mb-4">About This Event</h2>
      <p className="text-muted-foreground mb-6">{event.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start">
          <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-sm">Date & Time</h3>
            <p className="text-muted-foreground text-sm">{event.date}</p>
            <p className="text-muted-foreground text-sm">{event.time}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-sm">Location</h3>
            <p className="text-muted-foreground text-sm">{event.location}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <User className="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-sm">Organizer</h3>
            <p className="text-muted-foreground text-sm">{event.organizer}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-sm">Duration</h3>
            <p className="text-muted-foreground text-sm">{event.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailInfo;
