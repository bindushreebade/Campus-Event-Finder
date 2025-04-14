
import React, { useState } from 'react';
import { User, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

// Mock comments data
const initialComments: Comment[] = [
  {
    id: '1',
    user: {
      name: 'Jamie Smith',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
    content: "This event looks amazing! Can't wait to attend.",
    timestamp: '3 hours ago',
    likes: 5,
    isLiked: false,
  },
  {
    id: '2',
    user: {
      name: 'Taylor Johnson',
      avatar: 'https://i.pravatar.cc/150?img=44',
    },
    content: 'Does anyone know if there will be refreshments available?',
    timestamp: '2 hours ago',
    likes: 2,
    isLiked: false,
  },
  {
    id: '3',
    user: {
      name: 'Alex Williams',
      avatar: 'https://i.pravatar.cc/150?img=57',
    },
    content: 'I attended the previous one and it was fantastic. Highly recommend!',
    timestamp: '45 minutes ago',
    likes: 8,
    isLiked: true,
  },
];

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        name: 'You',
        avatar: 'https://i.pravatar.cc/150?img=68',
      },
      content: newComment,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    toast.success('Comment added!');
  };

  const handleLikeComment = (id: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          };
        }
        return comment;
      })
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-4">Discussion ({comments.length})</h2>
      
      {/* Add comment */}
      <div className="flex space-x-3">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/150?img=68" />
          <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
        </Avatar>
        <div className="flex-1 flex space-x-2">
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleAddComment();
            }}
          />
          <Button 
            size="icon" 
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <Avatar>
              <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
              <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium">{comment.user.name}</h3>
                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
              </div>
              <p className="my-1">{comment.content}</p>
              <button 
                className={`text-xs flex items-center space-x-1 ${comment.isLiked ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={() => handleLikeComment(comment.id)}
              >
                <span>❤</span>
                <span>{comment.likes} {comment.likes === 1 ? 'like' : 'likes'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
