
import React from 'react';
import { Bell, MessageSquare, Users, Calendar, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const notifications = [
  {
    id: 1,
    title: 'New RSVP',
    description: 'John Doe has RSVP\'d to "Tech Networking Mixer"',
    time: '10 minutes ago',
    icon: Users,
    read: false,
  },
  {
    id: 2,
    title: 'New Comment',
    description: 'Sarah has commented on "Campus Wellness Workshop"',
    time: '1 hour ago',
    icon: MessageSquare,
    read: false,
  },
  {
    id: 3,
    title: 'Event Reminder',
    description: 'Your event "Study Group Session" starts in 2 hours',
    time: '2 hours ago',
    icon: Calendar,
    read: false,
  },
  {
    id: 4,
    title: 'Capacity Alert',
    description: '"Career Fair" is at 85% capacity',
    time: '3 hours ago',
    icon: Info,
    read: true,
  },
  {
    id: 5,
    title: 'New RSVP',
    description: 'Alex Chen has RSVP\'d to "Game Night Fridays"',
    time: '5 hours ago',
    icon: Users,
    read: true,
  },
];

const DashboardNotifications: React.FC = () => {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div 
          key={notification.id} 
          className={`p-4 rounded-lg border flex items-start gap-3 
          ${notification.read ? 'bg-card' : 'bg-primary/5 border-primary/20'}`}
        >
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
            notification.read ? 'bg-muted' : 'bg-primary/10'
          }`}>
            <notification.icon className={`h-5 w-5 ${
              notification.read ? 'text-muted-foreground' : 'text-primary'
            }`} />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className={`font-medium ${notification.read ? '' : 'text-primary'}`}>
                {notification.title}
                {!notification.read && (
                  <span className="ml-2 inline-block h-2 w-2 rounded-full bg-primary"></span>
                )}
              </h4>
              <span className="text-xs text-muted-foreground">{notification.time}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
          </div>
        </div>
      ))}
      
      <Button variant="outline" className="w-full mt-4">
        Mark All As Read
      </Button>
    </div>
  );
};

export default DashboardNotifications;
