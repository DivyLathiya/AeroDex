'use client';

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export default function ExplainButton({ aircraftId, aircraftName }: { aircraftId: string, aircraftName: string }) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aircraftId, aircraftName })
      });
      const data = await res.json();
      if (data.explanation) {
        setExplanation(data.explanation);
      }
    } catch (e) {
      console.error(e);
      setExplanation("Failed to load explanation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-primary/10 border border-primary/20 rounded-2xl p-6">
      {!explanation && !loading && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> 
              AI Aircraft Explainer
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Curious about bypass ratios and engine efficiency? Let our AI explain the {aircraftName} in simple terms.
            </p>
          </div>
          <button 
            onClick={handleExplain}
            className="whitespace-nowrap bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Explain this aircraft
          </button>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-6 text-primary">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span className="font-medium">AI is thinking...</span>
        </div>
      )}

      {explanation && (
        <div className="animate-in fade-in slide-in-from-bottom-2">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" /> 
            AI Analysis: {aircraftName}
          </h3>
          <div className="prose prose-invert prose-primary max-w-none text-sm text-foreground/90">
            {/* Simple markdown rendering for the mock response */}
            {explanation.split('\n').map((line, i) => {
              if (line.startsWith('### ')) return <h4 key={i} className="text-lg font-bold mt-4 mb-2 text-white">{line.replace('### ', '')}</h4>;
              if (line.startsWith('**')) return <p key={i} className="mt-3 mb-1"><strong className="text-primary">{line.replace(/\*\*/g, '')}</strong></p>;
              if (line.trim() === '') return null;
              return <p key={i} className="mb-2">{line}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
