'use client';

import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Bot,
  Loader2,
  Send,
  User,
  X,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAiMentorAssistance } from '@/ai/flows/ai-mentor-assistance';
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export function AiMentorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isMentorLoading, setIsMentorLoading] = useState(false);
  const pathname = usePathname();

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = { sender: 'user', text: chatInput };
    setChatHistory((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsMentorLoading(true);

    const pathParts = pathname.split('/');
    let challengeId: string | undefined;
    if (pathParts[1] === 'challenges' && pathParts[2]) {
        challengeId = pathParts[2];
    }


    try {
      const result = await getAiMentorAssistance({
        challengeId: challengeId,
        query: chatInput,
        // We could potentially get the code from a shared state if needed
      });
      const aiMessage: ChatMessage = { sender: 'ai', text: result.response };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI assistance:', error);
      const errorMessage: ChatMessage = {
        sender: 'ai',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsMentorLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        >
          {isOpen ? <X size={24} /> : <Bot size={24} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-[400px] h-[600px] p-0 border-none rounded-2xl shadow-2xl mr-2 mb-2"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Card className="flex flex-col h-full w-full border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot /> AI Mentor
            </CardTitle>
            <CardDescription>
              Stuck? Ask for a hint or explanation about backend concepts or the current challenge.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col gap-4 min-h-0">
            <ScrollArea className="flex-grow pr-4 -mr-4 h-0">
              <div className="space-y-4">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      msg.sender === 'user' ? 'justify-end' : ''
                    }`}
                  >
                    {msg.sender === 'ai' && (
                      <Avatar className="w-8 h-8 border">
                        <AvatarFallback>
                          <Bot size={18} />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg p-3 max-w-[85%] text-sm ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary'
                      }`}
                    >
                      <ReactMarkdown 
                        className="prose prose-sm prose-invert max-w-none"
                        components={{
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                    {msg.sender === 'user' && (
                      <Avatar className="w-8 h-8 border">
                        <AvatarFallback>
                          <User size={18} />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isMentorLoading && (
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8 border">
                      <AvatarFallback>
                        <Bot size={18} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-secondary rounded-lg p-3 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-xs text-muted-foreground">
                        Thinking...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <form
              onSubmit={handleChatSubmit}
              className="flex items-center gap-2"
            >
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask for a hint..."
                className="flex-grow bg-secondary border-0"
                disabled={isMentorLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isMentorLoading || !chatInput.trim()}
              >
                <Send />
              </Button>
            </form>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
