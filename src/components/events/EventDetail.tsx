
import React from 'react';
import { Event } from '@/data/mockEvents';
import EventDetailHeader from './EventDetailHeader';
import EventDetailInfo from './EventDetailInfo';
import EventDetailSidebar from './EventDetailSidebar';
import CommentSection from './CommentSection';

interface EventDetailProps {
  event: Event;
}

const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
  return (
    <div className="animate-fade-in">
      <EventDetailHeader event={event} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <EventDetailInfo event={event} />
          
          <div className="glass-card p-6">
            <h2 className="text-xl font-medium mb-4">What to Expect</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="h-5 w-5 text-primary mr-2">•</span>
                <span>Networking opportunities with peers and professionals</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-primary mr-2">•</span>
                <span>Interactive sessions and workshops</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-primary mr-2">•</span>
                <span>Refreshments and snacks will be provided</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-primary mr-2">•</span>
                <span>Opportunity to ask questions and get insights</span>
              </li>
            </ul>
          </div>
          
          <div className="glass-card p-6">
            <CommentSection />
          </div>
        </div>

        <div className="lg:col-span-1">
          <EventDetailSidebar event={event} />
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
