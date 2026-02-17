
"use client";

import Link from 'next/link';
import { Cpu, Server, Home, Sparkles, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:bg-accent transition-colors">
            <Cpu className="w-6 h-6 text-primary-foreground group-hover:text-primary transition-colors" />
          </div>
          <span className="font-headline text-xl font-bold">Project Forge</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/projects" className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1.5">
            <Search className="w-4 h-4" />
            Browse
          </Link>
          <Link href="/categories" className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1.5">
            <Server className="w-4 h-4" />
            Categories
          </Link>
          <Link href="/ai-suggester">
            <Button variant="outline" className="gap-2 border-accent text-accent hover:bg-accent hover:text-primary font-headline">
              <Sparkles className="w-4 h-4" />
              AI Suggester
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
           {/* Mobile menu could go here if needed, but keeping it simple for now */}
           <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
           </Button>
        </div>
      </div>
    </nav>
  );
}
