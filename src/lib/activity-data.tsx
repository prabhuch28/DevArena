import { CheckCircle, Zap, BookOpen } from "lucide-react";

export const recentActivities = [
  {
    id: 1,
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    description: "Completed the 'Valid Parentheses' challenge",
    time: "2 hours ago",
    points: 150
  },
  {
    id: 2,
    icon: <BookOpen className="w-5 h-5 text-blue-400" />,
    description: "Finished the 'Securing Routes with JWT' tutorial",
    time: "1 day ago",
    points: 50
  },
  {
    id: 3,
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    description: "Started the 'Reverse String' challenge",
    time: "3 days ago"
  },
  {
    id: 4,
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    description: "Completed the 'Two Sum' challenge",
    time: "4 days ago",
    points: 100
  },
];
