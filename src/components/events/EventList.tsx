
import React from 'react';
import EventCard from './EventCard';
import { Event } from '@/data/mockEvents';

interface EventListProps {
  events: Event[];
  title?: string;
  description?: string;
  emptyMessage?: string;
  featuredIndex?: number;
}

const EventList: React.FC<EventListProps> = ({
  events,
  title,
  description,
  emptyMessage = "No events found",
  featuredIndex,
}) => {
  if (events.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {title && (
        <div className="space-y-2">
          <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <React.Fragment key={event.id}>
            {index === featuredIndex ? (
              <div className="md:col-span-2 lg:col-span-3 animate-scale-in">
                <EventCard event={event} variant="featured" />
              </div>
            ) : (
              <div className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <EventCard event={event} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default EventList;
