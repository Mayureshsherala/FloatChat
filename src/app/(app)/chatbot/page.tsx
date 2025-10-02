import { SidebarTrigger } from '@/components/ui/sidebar';
import { ChatInterface } from './components/chat-interface';

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-full p-4 md:p-8">
      <header className="flex items-center gap-4 mb-4 md:hidden">
        <SidebarTrigger />
        <h1 className="text-xl font-bold tracking-tight">AI Chatbot</h1>
      </header>
      <ChatInterface />
    </div>
  );
}
