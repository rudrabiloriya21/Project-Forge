
import Link from 'next/link';
import { PLATFORMS } from '@/app/lib/data';
import { Cpu, Server, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-headline mb-2">Platform Categories</h1>
        <p className="text-muted-foreground">Find the right project for your specific hardware platform.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Microcontrollers Group */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-headline">Microcontrollers</h2>
          </div>
          <div className="grid gap-4">
            {PLATFORMS.microcontrollers.map(platform => (
              <Link key={platform} href={`/projects?platform=${encodeURIComponent(platform)}`}>
                <Card className="hover:border-accent transition-colors group">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{platform}</p>
                      <p className="text-xs text-muted-foreground">Embedded systems & firmware</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Minicomputers Group */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Server className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-headline">Minicomputers</h2>
          </div>
          <div className="grid gap-4">
            {PLATFORMS.minicomputers.map(platform => (
              <Link key={platform} href={`/projects?platform=${encodeURIComponent(platform)}`}>
                <Card className="hover:border-accent transition-colors group">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{platform}</p>
                      <p className="text-xs text-muted-foreground">Compute clusters & retro servers</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
