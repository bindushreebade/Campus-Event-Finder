
import React from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit2, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/data/mockEvents';
import { toast } from 'sonner';

interface DashboardEventListProps {
  events: Event[];
}

const DashboardEventList: React.FC<DashboardEventListProps> = ({ events }) => {
  const handleDelete = (eventId: string) => {
    // In a real app, this would call an API to delete the event
    toast.success('Event deleted successfully');
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No events found</p>
        <Link to="/create-event">
          <Button className="mt-4">Create Your First Event</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="glass-card p-4 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-24 h-20 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.date} • {event.time}</p>
              </div>
              <Badge variant={event.isActive ? "default" : "outline"}>
                {event.isActive ? "Active" : "Draft"}
              </Badge>
            </div>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Users className="h-3.5 w-3.5 mr-1" />
              <span>{event.attendees} / {event.capacity} registered</span>
            </div>
          </div>
          <div className="flex md:flex-col gap-2 justify-end">
            <Link to={`/event/${event.id}`}>
              <Button variant="outline" size="sm" className="w-full">View</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link to={`/edit-event/${event.id}`}>
                  <DropdownMenuItem>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDelete(event.id)} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardEventList;
