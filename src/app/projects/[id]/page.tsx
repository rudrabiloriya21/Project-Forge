
"use client";

import { useParams, useRouter } from 'next/navigation';
import { PROJECTS, Difficulty } from '@/app/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Cpu, Server, ArrowLeft, Clock, Hammer, Code, ListChecks } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-headline mb-4">Project Not Found</h1>
        <p className="mb-8">The project you're looking for doesn't exist or has been moved.</p>
        <Button onClick={() => router.push('/projects')}>Back to Projects</Button>
      </div>
    );
  }

  const getDifficultyColor = (diff: Difficulty) => {
    switch(diff) {
      case 'easy': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
      case 'medium': return 'bg-amber-500/10 text-amber-600 border-amber-200';
      case 'hard': return 'bg-rose-500/10 text-rose-600 border-rose-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to all projects
      </Link>

      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getDifficultyColor(project.difficulty)}>
              <Clock className="w-3 h-3 mr-1" />
              {project.difficulty}
            </Badge>
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              {project.category === 'Microcontroller' ? <Cpu className="w-4 h-4" /> : <Server className="w-4 h-4" />}
              {project.category} / {project.platform}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">{project.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{project.description}</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Hammer className="w-5 h-5 text-accent" />
                  Bill of Materials
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {project.components.map((comp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-headline mb-6 flex items-center gap-2">
                <ListChecks className="w-6 h-6 text-accent" />
                Step-by-Step Instructions
              </h2>
              <div className="space-y-8">
                {project.instructions.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-headline font-bold shrink-0">
                        {idx + 1}
                      </div>
                      {idx !== project.instructions.length - 1 && <div className="w-px flex-grow bg-border my-2" />}
                    </div>
                    <div className="pt-1">
                      <p className="text-lg leading-relaxed text-foreground/80">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {project.code && (
              <section>
                <h2 className="text-2xl font-headline mb-6 flex items-center gap-2">
                  <Code className="w-6 h-6 text-accent" />
                  Source Code
                </h2>
                <div className="rounded-xl overflow-hidden bg-slate-900 text-slate-100 p-6 shadow-inner font-code text-sm">
                  <pre className="whitespace-pre-wrap break-all leading-relaxed">
                    <code>{project.code}</code>
                  </pre>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
