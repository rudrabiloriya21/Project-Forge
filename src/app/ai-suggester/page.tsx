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
import { Sparkles, Loader2, Wrench, ListChecks, BrainCircuit, Lightbulb, Clock, Cpu, Server, GraduationCap, Zap, Target, ShieldAlert, Code2, Coins, Microscope } from 'lucide-react';
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
    projectGoal: 'learning' as 'fun' | 'productivity' | 'learning' | 'industrial' | 'artistic',
    budget: 'modest' as 'ultra-low' | 'modest' | 'professional'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.availableComponents || !form.desiredOutcome) {
      toast({
        title: "Incomplete Telemetry",
        description: "Please specify your components and desired outcome for the Architect.",
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
        projectGoal: form.projectGoal,
        budget: form.budget
      });
      setSuggestion(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "Architectural Failure",
        description: "The AI was unable to synthesize a solution. Please check your constraints.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <Microscope className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tighter">System Architect <span className="text-accent">v2.0</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Advanced project synthesis engine. We don't just give you ideas—we engineer your entire roadmap from BOM to deployment.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-2 border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Input Constraints
              </CardTitle>
              <CardDescription>Configure your engineering environment.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Experience</Label>
                    <Select value={form.skillLevel} onValueChange={(val: any) => setForm({ ...form, skillLevel: val })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Budget</Label>
                    <Select value={form.budget} onValueChange={(val: any) => setForm({ ...form, budget: val })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ultra-low">Ultra Low</SelectItem>
                        <SelectItem value="modest">Modest</SelectItem>
                        <SelectItem value="professional">Pro Tier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Platform Preference</Label>
                  <Select value={form.preferredPlatform} onValueChange={(val: any) => setForm({ ...form, preferredPlatform: val })}>
                    <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Platform</SelectItem>
                      <SelectGroup>
                        <SelectLabel>Microcontrollers</SelectLabel>
                        {PLATFORMS.microcontrollers.slice(0, 6).map(p => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Minicomputers</SelectLabel>
                        {PLATFORMS.minicomputers.slice(0, 6).map(p => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Inventory</Label>
                  <Input 
                    placeholder="e.g. ESP32, OLED, Servo..."
                    value={form.availableComponents}
                    onChange={(e) => setForm({ ...form, availableComponents: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">The Vision</Label>
                  <Textarea 
                    placeholder="Describe your goal (e.g. 'A voice-activated robot that brings me tools')"
                    className="min-h-[120px] bg-background/50"
                    value={form.desiredOutcome}
                    onChange={(e) => setForm({ ...form, desiredOutcome: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full h-14 gap-2 text-lg font-headline shadow-lg shadow-primary/20" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Synthesizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Technical Blueprint
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Output Blueprint */}
        <div className="lg:col-span-8">
          {suggestion ? (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <Card className="border-accent/30 shadow-2xl overflow-hidden">
                <CardHeader className="bg-muted/50 border-b pb-8 relative">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge className="bg-primary text-white">ENGINEERED PROPOSAL</Badge>
                    <Badge variant="outline" className="capitalize">{suggestion.difficulty} Tier</Badge>
                    <Badge variant="secondary" className="flex items-center gap-1"><Clock className="w-3 h-3" /> {suggestion.estimatedTime}</Badge>
                    <Badge variant="secondary" className="flex items-center gap-1"><Coins className="w-3 h-3" /> {suggestion.estimatedCost}</Badge>
                  </div>
                  <CardTitle className="text-4xl md:text-5xl font-headline text-primary mb-2">{suggestion.projectName}</CardTitle>
                  <div className="flex items-center gap-4 text-muted-foreground font-medium uppercase tracking-tighter text-sm">
                    <span className="flex items-center gap-1"><Cpu className="w-4 h-4" /> {suggestion.platform}</span>
                    <span className="flex items-center gap-1"><Server className="w-4 h-4" /> {suggestion.category}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="py-8 space-y-12">
                  {/* Summary */}
                  <section>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Architectural Vision</h4>
                    <p className="text-xl leading-relaxed text-foreground/90 font-medium">{suggestion.description}</p>
                  </section>

                  <div className="grid md:grid-cols-2 gap-10">
                    {/* Software & Logic */}
                    <div className="space-y-10">
                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                          <Code2 className="w-4 h-4" /> Software Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {suggestion.softwareStack.map((lib, i) => (
                            <Badge key={i} variant="outline" className="bg-primary/5 font-mono text-[10px]">{lib}</Badge>
                          ))}
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                          <Zap className="w-4 h-4" /> Circuit Logic
                        </h4>
                        <p className="text-sm leading-relaxed text-muted-foreground bg-accent/5 p-4 rounded-lg border border-accent/10">
                          {suggestion.circuitLogic}
                        </p>
                      </section>
                    </div>

                    {/* Milestones */}
                    <section>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                        <ListChecks className="w-4 h-4 text-primary" /> Technical Milestones
                      </h4>
                      <ul className="space-y-4">
                        {suggestion.architectureSteps.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm font-medium">
                            <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">{i+1}</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  {/* Risks & BOM */}
                  <div className="grid md:grid-cols-2 gap-10">
                    <section className="bg-destructive/5 p-6 rounded-xl border border-destructive/10">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-destructive mb-4 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Critical Pitfalls
                      </h4>
                      <ul className="space-y-2">
                        {suggestion.pitfalls.map((risk, i) => (
                          <li key={i} className="text-sm text-destructive/80 flex gap-2">
                            <div className="w-1 h-1 rounded-full bg-destructive mt-2 shrink-0" />
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-accent" /> Bill of Materials
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {suggestion.requiredComponents.map((item, idx) => (
                          <Badge key={idx} variant="secondary" className="px-3 py-1 font-medium">{item}</Badge>
                        ))}
                      </div>
                    </section>
                  </div>

                  {/* Pro Tip */}
                  <section className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Architect's Pro-Tip</h4>
                    <p className="text-lg italic text-foreground/80 leading-relaxed">
                      "{suggestion.proTip}"
                    </p>
                  </section>
                </CardContent>
                
                <CardFooter className="bg-muted/30 border-t py-6 flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex-1 h-12 gap-2 border-primary/20" onClick={() => window.print()}>
                    Export Technical PDF
                  </Button>
                  <Button className="flex-1 h-12 gap-2" onClick={() => setSuggestion(null)}>
                    Draft New System
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[600px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-center p-12 bg-muted/10 border-primary/10 transition-all hover:bg-muted/20">
              <div className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center mb-8 rotate-12 transition-transform hover:rotate-0 shadow-inner">
                <BrainCircuit className="w-12 h-12 text-primary/40" />
              </div>
              <h3 className="text-3xl font-headline text-muted-foreground mb-4">Awaiting Directives</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-10 text-lg">
                Input your component telemetry and hardware vision on the left. The Architect will generate a comprehensive project blueprint.
              </p>
              <div className="grid grid-cols-3 gap-6 w-full max-w-lg">
                {[
                  { icon: Cpu, label: "Firmware" },
                  { icon: Code2, label: "Software" },
                  { icon: Zap, label: "Circuitry" }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-card border shadow-sm space-y-3">
                    <item.icon className="w-6 h-6 text-primary mx-auto" />
                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
