
"use client";

import { useState } from 'react';
import { aiProjectSuggestion, AiProjectSuggestionOutput } from '@/ai/flows/ai-project-suggestion-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, Wrench, ListChecks, BrainCircuit, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AiSuggesterPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<AiProjectSuggestionOutput | null>(null);

  const [form, setForm] = useState({
    skillLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    availableComponents: '',
    desiredOutcome: ''
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
        desiredOutcome: form.desiredOutcome
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
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 rounded-full bg-accent/10 border border-accent/20 mb-4">
          <BrainCircuit className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-4xl font-headline font-bold mb-4">AI Project Suggester</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Tell us what you have on your desk and what you're dreaming of, and our AI will engineer a project path just for you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Card className="border-2 border-primary/10 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Project Criteria</CardTitle>
            <CardDescription>Input your constraints to refine the suggestion.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="skill">Your Experience Level</Label>
                <Select 
                  value={form.skillLevel} 
                  onValueChange={(val: any) => setForm({ ...form, skillLevel: val })}
                >
                  <SelectTrigger id="skill">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (New to electronics)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (Knows basics & C++)</SelectItem>
                    <SelectItem value="advanced">Advanced (Systems engineering/ASM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="components">Components On Hand</Label>
                <Input 
                  id="components"
                  placeholder="Arduino UNO, LED, Resistors, ESP32..."
                  value={form.availableComponents}
                  onChange={(e) => setForm({ ...form, availableComponents: e.target.value })}
                />
                <p className="text-[10px] text-muted-foreground">Separate components with commas.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="outcome">Desired Outcome</Label>
                <Textarea 
                  id="outcome"
                  placeholder="I want to make something that monitors my houseplants..."
                  className="min-h-[100px]"
                  value={form.desiredOutcome}
                  onChange={(e) => setForm({ ...form, desiredOutcome: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full h-12 gap-2 text-lg font-headline" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Possibilities...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Project Idea
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {suggestion ? (
            <Card className="animate-in fade-in slide-in-from-right-4 duration-500 border-accent/30 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                <Lightbulb className="w-24 h-24 text-accent rotate-12" />
               </div>
              <CardHeader className="bg-accent/5">
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-accent text-primary font-headline uppercase text-[10px] tracking-widest">Suggested For You</Badge>
                  <Badge variant="outline" className="capitalize">{suggestion.difficulty}</Badge>
                </div>
                <CardTitle className="text-2xl font-headline text-primary">{suggestion.projectName}</CardTitle>
              </CardHeader>
              <CardContent className="py-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-tight text-muted-foreground mb-2">The Concept</h4>
                  <p className="text-lg leading-relaxed">{suggestion.description}</p>
                </div>

                <div className="grid gap-4">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-tight text-muted-foreground mb-2 flex items-center gap-2">
                      <Wrench className="w-4 h-4" /> Required Tech
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.requiredComponents.map((item, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-primary/5 border-primary/10 text-primary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 py-4 flex flex-col gap-4">
                <p className="text-xs text-muted-foreground italic text-center">Note: This is an AI-generated suggestion based on your inputs.</p>
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-primary" onClick={() => window.print()}>
                   Save PDF Instructions
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-8 bg-muted/20">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <h3 className="text-lg font-headline text-muted-foreground mb-2">Your next big project starts here</h3>
              <p className="text-sm text-muted-foreground max-w-[250px]">Fill out the form to see an AI-generated project proposal tailored to your workshop.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
