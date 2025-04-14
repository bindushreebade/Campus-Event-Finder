
import React from 'react';
import { 
  Mail, 
  MessageSquare, 
  ArrowUpRight, 
  Search, 
  Calendar,
  User
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Simulated attendee data
const attendees = [
  {
    id: 1,
    name: 'Emma Johnson',
    email: 'emma.j@university.edu',
    avatar: 'https://i.pravatar.cc/150?img=45',
    events: 3,
    lastActive: '2 hours ago',
  },
  {
    id: 2,
    name: 'Marcus Lee',
    email: 'marcus.l@university.edu',
    avatar: 'https://i.pravatar.cc/150?img=62',
    events: 5,
    lastActive: '1 day ago',
  },
  {
    id: 3,
    name: 'Sophia Rodriguez',
    email: 'sophia.r@university.edu',
    avatar: 'https://i.pravatar.cc/150?img=32',
    events: 2,
    lastActive: '3 days ago',
  },
  {
    id: 4,
    name: 'Ethan Williams',
    email: 'ethan.w@university.edu',
    avatar: 'https://i.pravatar.cc/150?img=12',
    events: 4,
    lastActive: '1 week ago',
  },
  {
    id: 5,
    name: 'Olivia Chen',
    email: 'olivia.c@university.edu',
    avatar: 'https://i.pravatar.cc/150?img=17',
    events: 1,
    lastActive: '2 weeks ago',
  },
];

interface DashboardAttendeesProps {
  totalAttendees: number;
}

const DashboardAttendees: React.FC<DashboardAttendeesProps> = ({ totalAttendees }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search attendees..."
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Email All
          </Button>
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Export List
          </Button>
        </div>
      </div>

      <div className="bg-muted/20 px-4 py-3 rounded-md flex flex-col sm:flex-row gap-2 justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 h-8 w-8 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Total Attendees</h3>
            <p className="text-sm text-muted-foreground">Across all your events</p>
          </div>
        </div>
        <Badge className="text-md font-semibold">{totalAttendees}</Badge>
      </div>
      
      <div className="space-y-4 mt-6">
        {attendees.map((attendee) => (
          <div key={attendee.id} className="flex items-center gap-4 p-4 rounded-lg border bg-card">
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img
                src={attendee.avatar}
                alt={attendee.name}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium">{attendee.name}</h4>
              <p className="text-sm text-muted-foreground">{attendee.email}</p>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-muted-foreground">
                  {attendee.events} events attended
                </span>
                <span className="text-xs text-muted-foreground">
                  Last active: {attendee.lastActive}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAttendees;
