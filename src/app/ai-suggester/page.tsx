"use client";

import { useState } from 'react';
import { aiProjectSuggestion, AiProjectSuggestionOutput } from '@/ai/flows/ai-project-suggestion-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, Wrench, ListChecks, BrainCircuit, Lightbulb, Clock, Cpu, Server, GraduationCap, Zap, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PLATFORMS } from '@/app/lib/data';

export default function AiSuggesterPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<AiProjectSuggestionOutput | null>(null);

  const [form, setForm] = useState({
    skillLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    availableComponents: '',
    desiredOutcome: '',
    preferredPlatform: 'any',
    projectGoal: 'learning' as 'fun' | 'productivity' | 'learning' | 'industrial'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.availableComponents || !form.desiredOutcome) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to get the best suggestion.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setSuggestion(null);

    try {
      const result = await aiProjectSuggestion({
        skillLevel: form.skillLevel,
        availableComponents: form.availableComponents.split(',').map(c => c.trim()),
        desiredOutcome: form.desiredOutcome,
        preferredPlatform: form.preferredPlatform === 'any' ? undefined : form.preferredPlatform,
        projectGoal: form.projectGoal
      });
      setSuggestion(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "AI Suggestion Failed",
        description: "There was an error generating your project suggestion. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 rounded-full bg-accent/10 border border-accent/20 mb-4">
          <BrainCircuit className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">AI Project Engineer</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Don't just get an idea—get a technical proposal. Tell us your constraints, and we'll architect a personalized roadmap.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-2 border-primary/10 shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Project Constraints
              </CardTitle>
              <CardDescription>Input your hardware and goals to generate a plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skill">Experience</Label>
                    <Select 
                      value={form.skillLevel} 
                      onValueChange={(val: any) => setForm({ ...form, skillLevel: val })}
                    >
                      <SelectTrigger id="skill">
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goal">Primary Goal</Label>
                    <Select 
                      value={form.projectGoal} 
                      onValueChange={(val: any) => setForm({ ...form, projectGoal: val })}
                    >
                      <SelectTrigger id="goal">
                        <SelectValue placeholder="Goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fun">Just for Fun</SelectItem>
                        <SelectItem value="learning">Skill Building</SelectItem>
                        <SelectItem value="productivity">Productivity</SelectItem>
                        <SelectItem value="industrial">Work / Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform">Preferred Platform</Label>
                  <Select 
                    value={form.preferredPlatform} 
                    onValueChange={(val: any) => setForm({ ...form, preferredPlatform: val })}
                  >
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Platform</SelectItem>
                      <SelectGroup>
                        <SelectLabel>Microcontrollers</SelectLabel>
                        {PLATFORMS.microcontrollers.slice(0, 8).map(p => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Minicomputers</SelectLabel>
                        {PLATFORMS.minicomputers.slice(0, 8).map(p => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="components">Components On Hand</Label>
                  <Input 
                    id="components"
                    placeholder="Arduino, LED, ESP32, LDR, Motor..."
                    value={form.availableComponents}
                    onChange={(e) => setForm({ ...form, availableComponents: e.target.value })}
                  />
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Comma separated list</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outcome">Desired Outcome</Label>
                  <Textarea 
                    id="outcome"
                    placeholder="Describe what you want to achieve (e.g., 'An automated pet feeder with cloud control')"
                    className="min-h-[100px]"
                    value={form.desiredOutcome}
                    onChange={(e) => setForm({ ...form, desiredOutcome: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full h-14 gap-2 text-lg font-headline transition-all hover:scale-[1.02] active:scale-[0.98]" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Engineering Solution...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Technical Proposal
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7">
          {suggestion ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-accent/30 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  {suggestion.category === 'Microcontroller' ? <Cpu className="w-32 h-32 text-accent" /> : <Server className="w-32 h-32 text-accent" />}
                </div>
                <CardHeader className="bg-muted/50 border-b pb-8">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge className="bg-accent text-white uppercase tracking-widest text-[10px]">Proposal Generated</Badge>
                    <Badge variant="outline" className="capitalize border-primary/20">{suggestion.difficulty} Difficulty</Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {suggestion.estimatedTime}
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-headline text-primary mb-2">{suggestion.projectName}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground font-medium">
                    {suggestion.category === 'Microcontroller' ? <Cpu className="w-4 h-4" /> : <Server className="w-4 h-4" />}
                    {suggestion.category} Platform: <span className="text-foreground">{suggestion.platform}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="py-8 space-y-10">
                  <section>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">The Concept</h4>
                    <p className="text-xl leading-relaxed text-foreground/90">{suggestion.description}</p>
                  </section>

                  <div className="grid md:grid-cols-2 gap-8">
                    <section>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                        <ListChecks className="w-4 h-4 text-accent" /> Technical Architecture
                      </h4>
                      <ul className="space-y-3">
                        {suggestion.architectureSteps.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm leading-relaxed">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-[10px]">{i+1}</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-accent" /> Learning Path
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {suggestion.learningOutcomes.map((outcome, i) => (
                          <Badge key={i} variant="outline" className="bg-primary/5 border-primary/10 text-primary py-1 px-3">
                            {outcome}
                          </Badge>
                        ))}
                      </div>
                    </section>
                  </div>

                  <section className="bg-accent/5 border border-accent/10 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                    <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Pro Tip / Expert Insight
                    </h4>
                    <p className="text-foreground/80 italic italic leading-relaxed">
                      "{suggestion.proTip}"
                    </p>
                  </section>

                  <section>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-accent" /> Bill of Materials
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.requiredComponents.map((item, idx) => (
                        <Badge key={idx} variant="secondary" className="px-3 py-1.5 font-medium">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </section>
                </CardContent>
                
                <CardFooter className="bg-muted/30 border-t py-6 flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex-1 h-12 gap-2 border-primary/20" onClick={() => window.print()}>
                    Export Proposal (PDF)
                  </Button>
                  <Button className="flex-1 h-12 gap-2" onClick={() => setSuggestion(null)}>
                    Engineer Another
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-center p-12 bg-muted/10 border-primary/10">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10 text-muted-foreground/30" />
              </div>
              <h3 className="text-2xl font-headline text-muted-foreground mb-3">Your Next Engineering Feat</h3>
              <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                Tell us about your components and project dreams. Our AI will architect a professional solution tailored to your workshop.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                <div className="p-4 rounded-xl bg-card border text-left space-y-1">
                  <Cpu className="w-5 h-5 text-accent" />
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">MCU focus</p>
                </div>
                <div className="p-4 rounded-xl bg-card border text-left space-y-1">
                  <Server className="w-5 h-5 text-primary" />
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">SBC focus</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
