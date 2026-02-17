import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cpu, Server, ArrowRight, Zap, Layers, Code, Sparkles } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${PlaceHolderImages.find(i => i.id === 'hero-bg')?.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent z-1" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Next-Gen Maker Platform</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary leading-tight mb-6">
              Engineer the <span className="text-accent underline decoration-4 underline-offset-8">Future</span> in Your Workshop.
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg">
              Project Forge is the premier destination for microcontroller enthusiasts and vintage minicomputer restorers. Discover step-by-step guides, source code, and AI-powered project ideas.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/categories">
                <Button size="lg" className="h-14 px-8 text-lg font-headline gap-2">
                  Get Started <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/ai-suggester">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-headline border-primary/20">
                  Try AI Suggester
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Entry */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline mb-4">Choose Your Path</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Whether you're into modern embedded systems or the golden age of computing, we've got you covered.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Microcontrollers */}
          <Link href="/projects?category=Microcontroller" className="group">
            <div className="relative overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-2xl hover:-translate-y-1">
              <div className="aspect-video relative">
                <img 
                  src={PlaceHolderImages.find(i => i.id === 'microcontroller-cat')?.imageUrl} 
                  alt="Microcontrollers"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <Cpu className="w-10 h-10 mb-2" />
                  <h3 className="text-2xl font-headline">Microcontrollers</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">Arduino, ESP32, STM32 and more. Build IoT devices, robots, and smart sensors.</p>
                <div className="flex flex-wrap gap-2">
                  {['Arduino', 'ESP32', 'STM32', 'ARM'].map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-muted rounded-md text-xs font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>

          {/* Minicomputers */}
          <Link href="/projects?category=Minicomputer" className="group">
            <div className="relative overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-2xl hover:-translate-y-1">
              <div className="aspect-video relative">
                <img 
                  src={PlaceHolderImages.find(i => i.id === 'minicomputer-cat')?.imageUrl} 
                  alt="Minicomputers"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <Server className="w-10 h-10 mb-2" />
                  <h3 className="text-2xl font-headline">Minicomputers</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">Vintage DEC hardware to modern Raspberry Pis. Master operating systems and retro emulation.</p>
                <div className="flex flex-wrap gap-2">
                  {['PDP-11', 'Raspberry Pi', 'HP 3000', 'Nova'].map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-muted rounded-md text-xs font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="bg-accent/20 p-4 rounded-full mb-6">
                <Layers className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-headline mb-3">Modular Tutorials</h3>
              <p className="text-primary-foreground/70">Clear, step-by-step instructions that break down complex hardware concepts into manageable parts.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-accent/20 p-4 rounded-full mb-6">
                <Code className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-headline mb-3">Validated Code</h3>
              <p className="text-primary-foreground/70">Every project includes production-ready code snippets and implementation examples you can trust.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-accent/20 p-4 rounded-full mb-6">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-headline mb-3">AI Guidance</h3>
              <p className="text-primary-foreground/70">Use our generative AI tools to find projects that perfectly match the components in your drawer.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
