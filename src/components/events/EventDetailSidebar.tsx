
import React, { useState } from 'react';
import { Heart, Bell, Share2, Users, Calendar, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Event } from '@/data/mockEvents';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EventDetailSidebarProps {
  event: Event;
}

const EventDetailSidebar: React.FC<EventDetailSidebarProps> = ({ event }) => {
  const [isAttending, setIsAttending] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isReminded, setIsReminded] = useState(false);
  const [showRSVPDialog, setShowRSVPDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
  const percentFull = Math.round((event.attendees / event.capacity) * 100);
  const spotsLeft = event.capacity - event.attendees;

  const handleRSVP = () => {
    if (isAttending) {
      // Cancel RSVP
      setIsAttending(false);
      toast.info('You have cancelled your RSVP.');
    } else {
      // Show RSVP dialog
      setShowRSVPDialog(true);
    }
  };

  const confirmRSVP = () => {
    // Process RSVP
    setIsAttending(true);
    setShowRSVPDialog(false);
    
    // Show success toast with notification
    toast.success('You have successfully RSVP\'d!', {
      description: `See you at ${event.title} on ${event.date}`,
      action: {
        label: "Add to Calendar",
        onClick: () => addToCalendar()
      }
    });
  };

  const addToCalendar = () => {
    // In a real app, this would generate a calendar event file or link
    toast.success('Event added to your calendar!');
  };

  const handleSaveEvent = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      toast.success('Event saved to your favorites!');
    } else {
      toast.info('Event removed from your favorites.');
    }
  };

  const handleSetReminder = () => {
    setIsReminded(!isReminded);
    if (!isReminded) {
      toast.success('Reminder set for this event!', {
        description: 'We\'ll notify you 24 hours before the event starts.'
      });
    } else {
      toast.info('Reminder cancelled for this event.');
    }
  };

  const handleShareEvent = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Event link copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-lg font-medium mb-4">RSVP to this Event</h2>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">{event.attendees} attending</span>
            <span className="text-sm text-primary font-medium">{spotsLeft} spots left</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                percentFull >= 80 ? 'bg-primary' : 'bg-primary/60'
              }`}
              style={{ width: `${percentFull}%` }}
            ></div>
          </div>
        </div>

        <Button 
          onClick={handleRSVP} 
          className="w-full mb-3"
          variant={isAttending ? "outline" : "default"}
        >
          {isAttending ? (
            <>
              <Check className="mr-2 h-4 w-4" /> 
              You're Attending
            </>
          ) : "RSVP Now"}
        </Button>
        
        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleSaveEvent}
            className={isSaved ? "text-primary" : ""}
          >
            <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleSetReminder}
            className={isReminded ? "text-primary" : ""}
          >
            <Bell className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleShareEvent}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Event time */}
        {isAttending && (
          <div className="mt-4 p-3 bg-primary/10 rounded-md flex items-center">
            <Calendar className="h-5 w-5 text-primary mr-3" />
            <div>
              <p className="text-sm font-medium">{event.date}</p>
              <p className="text-xs text-muted-foreground">{event.time}</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={addToCalendar}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* RSVP Dialog */}
      <Dialog open={showRSVPDialog} onOpenChange={setShowRSVPDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>RSVP to {event.title}</DialogTitle>
            <DialogDescription>
              Enter your information to reserve your spot.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRSVPDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRSVP} disabled={!email || !name}>
              Confirm RSVP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Who's Attending */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-medium mb-4">Who's Attending</h2>
        <div className="flex -space-x-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="w-10 h-10 rounded-full border-2 border-white bg-muted overflow-hidden"
            >
              <img 
                src={`https://i.pravatar.cc/150?img=${i + 10}`} 
                alt="Attendee" 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white text-xs font-medium">
            +{event.attendees - 5}
          </div>
        </div>
        <div className="flex items-center text-sm">
          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">
            {isAttending ? 'You and ' : ''}{event.attendees}{isAttending ? ' others' : ' people'} are attending
          </span>
        </div>
      </div>

      {/* Similar Events */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-medium mb-4">Similar Events</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="h-14 w-14 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={`https://images.unsplash.com/photo-${1550000000000 + i * 100000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`} 
                  alt="Event thumbnail" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium line-clamp-1">Similar Event {i + 1}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">Date • Location</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetailSidebar;
