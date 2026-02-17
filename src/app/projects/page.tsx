
"use client";

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PROJECTS, Difficulty } from '@/app/lib/data';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Cpu, Server, Clock } from 'lucide-react';
import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';

export default function ProjectsListingPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialPlatform = searchParams.get('platform');
  const db = useFirestore();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory || 'all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  // Firestore integration - Fixed the null reference error
  const projectsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return collection(db, 'projects'); 
  }, [db]);

  // For the prototype, we prioritize the rich local dataset in PROJECTS
  // but we keep the hook here to demonstrate the pattern.
  const { data: remoteProjects } = useCollection(projectsQuery);

  const filteredProjects = useMemo(() => {
    // Combine local and potential remote projects
    const allProjects = [...PROJECTS];
    
    return allProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === 'all' || project.difficulty === difficultyFilter;
      const matchesPlatform = !initialPlatform || project.platform === initialPlatform;
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesPlatform;
    });
  }, [searchQuery, categoryFilter, difficultyFilter, initialPlatform]);

  const getDifficultyColor = (diff: Difficulty) => {
    switch(diff) {
      case 'easy': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
      case 'medium': return 'bg-amber-500/10 text-amber-600 border-amber-200';
      case 'hard': return 'bg-rose-500/10 text-rose-600 border-rose-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex-grow">
          <h1 className="text-4xl font-headline mb-4">Explore {filteredProjects.length} Projects</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search by keyword, component, or tech..." 
              className="pl-10 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground px-1">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px] h-12">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Microcontroller">Microcontrollers</SelectItem>
                <SelectItem value="Minicomputer">Minicomputers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted-foreground px-1">Difficulty</label>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-[150px] h-12">
                <SelectValue placeholder="All Difficulties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Level</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {initialPlatform && (
        <div className="mb-8 p-4 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-between">
          <span className="text-sm font-medium">Filtering by platform: <span className="font-bold">{initialPlatform}</span></span>
          <Link href="/projects" className="text-xs underline text-accent">Clear filter</Link>
        </div>
      )}

      {filteredProjects.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="group h-full">
              <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-xl hover:border-accent">
                <CardHeader className="relative pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className={getDifficultyColor(project.difficulty)}>
                      <Clock className="w-3 h-3 mr-1" />
                      {project.difficulty}
                    </Badge>
                    {project.category === 'Microcontroller' ? (
                      <Cpu className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Server className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <CardTitle className="group-hover:text-accent transition-colors line-clamp-1">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow pt-4">
                  <CardDescription className="text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </CardDescription>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.components.slice(0, 3).map(comp => (
                      <span key={comp} className="text-[10px] px-2 py-0.5 bg-muted rounded border">{comp}</span>
                    ))}
                    {project.components.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 text-muted-foreground">+{project.components.length - 3} more</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 border-t bg-muted/30 py-4">
                  <span className="text-xs font-semibold text-muted-foreground">{project.platform}</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-muted/30">
          <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-headline mb-2">No projects found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}
