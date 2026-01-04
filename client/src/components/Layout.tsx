import React from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { BookOpen, Flower2, Calendar } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { href: '/', icon: Calendar, label: 'Year View' },
    { href: '/garden', icon: Flower2, label: 'My Garden' },
    { href: '/journal', icon: BookOpen, label: 'Journal' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Paper texture overlay for the whole app */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-50 mix-blend-multiply bg-[url('/images/paper_texture.jpg')] bg-cover bg-fixed" />
      
      <header className="pt-8 pb-4 px-4 text-center">
        <h1 className="text-4xl font-display text-primary tracking-wide">one year</h1>
        <p className="text-muted-foreground font-sans text-sm mt-1">daily journal</p>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-4 pb-24">
        {children}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-border shadow-lg rounded-full px-6 py-3 flex items-center gap-8 z-50">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <a className={cn(
                "flex flex-col items-center gap-1 transition-all duration-300 hover:scale-110",
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
              )}>
                <item.icon className={cn("w-6 h-6", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
