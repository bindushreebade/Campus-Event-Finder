
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Event } from '@/data/mockEvents';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'featured';
}

const EventCard: React.FC<EventCardProps> = ({ event, variant = 'default' }) => {
  const isFeatured = variant === 'featured';
  const percentFull = Math.round((event.attendees / event.capacity) * 100);
  const isAlmostFull = percentFull >= 80;

  return (
    <div 
      className={`glass-card hover-lift overflow-hidden ${
        isFeatured ? 'md:flex bg-gradient-to-br from-white to-secondary/30' : ''
      }`}
    >
      <div 
        className={`relative overflow-hidden ${
          isFeatured ? 'md:w-2/5 h-64 md:h-auto' : 'h-48'
        }`}
      >
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge 
            variant="secondary" 
            className="bg-white/90 backdrop-blur-sm text-xs flex items-center gap-1.5 font-medium shadow-sm"
          >
            <event.categoryIcon className="h-3 w-3" />
            {event.category}
          </Badge>
        </div>
        {event.isPopular && (
          <div className="absolute top-3 right-3">
            <Badge 
              className="bg-primary text-white text-xs font-medium animate-pulse-subtle"
            >
              Popular
            </Badge>
          </div>
        )}
      </div>

      <div className={`p-5 ${isFeatured ? 'md:w-3/5' : ''}`}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className={`font-medium text-balance ${isFeatured ? 'text-xl' : 'text-lg'}`}>
              {event.title}
            </h3>
            <p className="text-muted-foreground text-sm">{event.organizer}</p>
          </div>
        </div>

        <p className={`text-muted-foreground ${isFeatured ? 'block mb-4' : 'line-clamp-2 mb-4 text-sm'}`}>
          {event.description}
        </p>

        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-primary/70" />
            <span>{event.date} • {event.time}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-primary/70" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2 text-primary/70" />
            <span>{event.attendees} attending</span>
            
            <div className="ml-auto flex items-center">
              <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    isAlmostFull ? 'bg-primary' : 'bg-primary/60'
                  }`}
                  style={{ width: `${percentFull}%` }}
                ></div>
              </div>
              <span className="text-xs ml-2">
                {isAlmostFull ? 'Almost full' : `${percentFull}%`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link to={`/event/${event.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
          <Button size="sm">RSVP</Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
