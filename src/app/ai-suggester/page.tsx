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
import { Sparkles, Loader2, Wrench, ListChecks, BrainCircuit, Lightbulb, Clock, Cpu, Server, GraduationCap, Zap, Target, ShieldAlert, Code2, Coins, Microscope, FileText, Terminal } from 'lucide-react';
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
      toast({
        title: "Synthesis Complete",
        description: "Your technical blueprint and source code have been generated.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Architectural Failure",
        description: "The AI was unable to synthesize a solution. Please check your constraints and try again.",
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
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tighter">System Architect <span className="text-accent">v4.0</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Generative Engineering Engine. We architect complete technical roadmaps including production-ready firmware and software logic.
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
                        {PLATFORMS.microcontrollers.slice(0, 10).map(p => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Minicomputers</SelectLabel>
                        {PLATFORMS.minicomputers.slice(0, 10).map(p => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Component Inventory</Label>
                  <Input 
                    placeholder="e.g. ESP32, OLED, Servo, BMP280..."
                    value={form.availableComponents}
                    onChange={(e) => setForm({ ...form, availableComponents: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">The Vision</Label>
                  <Textarea 
                    placeholder="Describe your goal (e.g. 'A smart greenhouse controller with MQTT data logging')"
                    className="min-h-[140px] bg-background/50"
                    value={form.desiredOutcome}
                    onChange={(e) => setForm({ ...form, desiredOutcome: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full h-14 gap-2 text-lg font-headline shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90" disabled={loading}>
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
                    <Badge className="bg-primary text-white px-3 py-1">ENGINEERED BLUEPRINT</Badge>
                    <Badge variant="outline" className="capitalize border-primary/30 text-primary font-bold">{suggestion.difficulty} COMPLEXITY</Badge>
                    <Badge variant="secondary" className="flex items-center gap-1"><Clock className="w-3 h-3" /> {suggestion.estimatedTime}</Badge>
                    <Badge variant="secondary" className="flex items-center gap-1"><Coins className="w-3 h-3" /> {suggestion.estimatedCost}</Badge>
                  </div>
                  <CardTitle className="text-4xl md:text-5xl font-headline text-primary mb-2 tracking-tighter">{suggestion.projectName}</CardTitle>
                  <div className="flex items-center gap-4 text-muted-foreground font-medium uppercase tracking-tighter text-sm">
                    <span className="flex items-center gap-1"><Cpu className="w-4 h-4 text-primary" /> {suggestion.platform}</span>
                    <span className="flex items-center gap-1"><Server className="w-4 h-4 text-accent" /> {suggestion.category}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="py-8 space-y-12">
                  {/* Summary */}
                  <section>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500" /> Architectural Vision
                    </h4>
                    <p className="text-xl leading-relaxed text-foreground/90 font-medium">{suggestion.description}</p>
                  </section>

                  {/* Code Section */}
                  <section className="bg-slate-950 rounded-xl overflow-hidden shadow-2xl">
                    <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Main Source File</span>
                      </div>
                      <Badge variant="outline" className="text-[9px] border-slate-700 text-slate-500 font-mono">UTF-8</Badge>
                    </div>
                    <div className="p-6 font-mono text-sm text-emerald-50/90 leading-relaxed overflow-x-auto max-h-[500px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                      <pre><code>{suggestion.fullSourceCode}</code></pre>
                    </div>
                  </section>

                  <div className="grid md:grid-cols-2 gap-10">
                    {/* Software & Logic */}
                    <div className="space-y-10">
                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                          <Code2 className="w-4 h-4" /> Recommended Software Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {suggestion.softwareStack.map((lib, i) => (
                            <Badge key={i} variant="outline" className="bg-primary/5 font-mono text-[10px] px-3 border-primary/20">{lib}</Badge>
                          ))}
                        </div>
                      </section>

                      <section>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                          <Zap className="w-4 h-4" /> Circuit & Hardware Logic
                        </h4>
                        <div className="text-sm leading-relaxed text-muted-foreground bg-accent/5 p-4 rounded-lg border border-accent/10 italic">
                          "{suggestion.circuitLogic}"
                        </div>
                      </section>
                    </div>

                    {/* Milestones */}
                    <section>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                        <ListChecks className="w-4 h-4 text-primary" /> Engineering Milestones
                      </h4>
                      <ul className="space-y-4">
                        {suggestion.architectureSteps.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm font-medium items-start">
                            <span className="w-6 h-6 rounded bg-primary text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">{i+1}</span>
                            <span className="pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  {/* Risks & BOM */}
                  <div className="grid md:grid-cols-2 gap-10">
                    <section className="bg-destructive/5 p-6 rounded-xl border border-destructive/10">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-destructive mb-4 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Potential Technical Pitfalls
                      </h4>
                      <ul className="space-y-3">
                        {suggestion.pitfalls.map((risk, i) => (
                          <li key={i} className="text-sm text-destructive/80 flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="bg-muted/30 p-6 rounded-xl border">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-accent" /> Optimized Bill of Materials
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {suggestion.requiredComponents.map((item, idx) => (
                          <Badge key={idx} variant="secondary" className="px-3 py-1 font-medium bg-white border">{item}</Badge>
                        ))}
                      </div>
                    </section>
                  </div>

                  {/* Outcomes & Tip */}
                  <div className="grid md:grid-cols-2 gap-10">
                    <section>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" /> Learning Outcomes
                      </h4>
                      <ul className="space-y-2">
                        {suggestion.learningOutcomes.map((outcome, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Architect's Secret</h4>
                      <p className="text-lg italic text-foreground/80 leading-relaxed">
                        "{suggestion.proTip}"
                      </p>
                    </section>
                  </div>
                </CardContent>
                
                <CardFooter className="bg-muted/30 border-t py-6 flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex-1 h-12 gap-2 border-primary/20" onClick={() => window.print()}>
                    <FileText className="w-4 h-4" /> Export Technical PDF
                  </Button>
                  <Button className="flex-1 h-12 gap-2 bg-primary hover:bg-primary/90" onClick={() => setSuggestion(null)}>
                    Draft New System
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[600px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-center p-12 bg-muted/10 border-primary/10 transition-all hover:bg-muted/20">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 rotate-12 transition-transform hover:rotate-0 shadow-inner">
                <BrainCircuit className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-3xl font-headline text-muted-foreground mb-4 tracking-tighter">Awaiting Design Parameters</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-10 text-lg">
                Input your component telemetry and hardware vision. Our architect will synthesize a complete technical roadmap including full source code.
              </p>
              <div className="grid grid-cols-3 gap-6 w-full max-w-lg">
                {[
                  { icon: Cpu, label: "Firmware" },
                  { icon: Code2, label: "Libraries" },
                  { icon: Zap, label: "Circuits" }
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
