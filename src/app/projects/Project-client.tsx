"use client";

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PROJECTS, Difficulty } from '@/app/lib/data';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Search, Filter, Cpu, Server, Clock } from 'lucide-react';

export default function ProjectsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialPlatform = searchParams.get('platform');

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(initialCategory || 'all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === 'all' || project.category === categoryFilter;

      const matchesDifficulty =
        difficultyFilter === 'all' || project.difficulty === difficultyFilter;

      const matchesPlatform =
        !initialPlatform || project.platform === initialPlatform;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty &&
        matchesPlatform
      );
    });
  }, [searchQuery, categoryFilter, difficultyFilter, initialPlatform]);

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case 'easy':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
      case 'medium':
        return 'bg-amber-500/10 text-amber-600 border-amber-200';
      case 'hard':
        return 'bg-rose-500/10 text-rose-600 border-rose-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        Explore {filteredProjects.length} Projects
      </h1>

      <Input
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6"
      />

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 border rounded-xl">
          <Filter className="mx-auto mb-4 text-muted-foreground" />
          <p>No projects found</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="h-full hover:shadow-lg transition">
              <CardHeader>
                <Badge className={getDifficultyColor(project.difficulty)}>
                  <Clock className="w-3 h-3 mr-1" />
                  {project.difficulty}
                </Badge>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between text-xs text-muted-foreground">
                <span>{project.platform}</span>
                {project.category === 'Microcontroller' ? <Cpu /> : <Server />}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
