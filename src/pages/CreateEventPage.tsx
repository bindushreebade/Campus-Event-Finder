
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import EventForm from '@/components/events/EventForm';
import { toast } from 'sonner';

const CreateEventPage: React.FC = () => {
  const navigate = useNavigate();

  const handleEventCreated = () => {
    toast.success('Event created successfully!', {
      description: 'Your event has been published and is now live.',
      action: {
        label: 'View Dashboard',
        onClick: () => navigate('/dashboard')
      }
    });
    
    // Redirect to dashboard after a delay
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  return (
    <div className="min-h-screen">
      <div className="section-container pt-24">
        <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        
        <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
        <p className="text-muted-foreground mb-6">Fill out the form below to create a new campus event</p>
        
        <EventForm onSuccess={handleEventCreated} />
      </div>
    </div>
  );
};

export default CreateEventPage;
