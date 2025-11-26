'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Globe, ArrowRight, Activity } from 'lucide-react';
import { useSession } from '@/context/session-context';
import { useToast } from '@/hooks/use-toast';

const SiteWebview = () => {
  const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
  const [iframeUrl, setIframeUrl] = useState('https://www.google.com/webhp?igu=1');
  const { setSessionData } = useSession();
  const { toast } = useToast();

  const handleLoadUrl = () => {
    let finalUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      finalUrl = 'https://' + url;
    }
    setIframeUrl(finalUrl);
    
    // Simulate reconnaissance after loading the URL
    simulateRecon(finalUrl);
  };
  
  const simulateRecon = (loadedUrl: string) => {
    // This is a simulation of extracting data.
    // In a real browser extension, this would involve content scripts
    // inspecting the DOM and network requests of the loaded page.
    
    // Simulate extracting params from a known game URL structure
    try {
      const urlObject = new URL(loadedUrl);
      const params = urlObject.searchParams;

      // Example: https://game.com/launch?params={...encoded data...}
      // For this simulation, we'll just generate fake data.
      const newSessionData = {
        userId: `user_${Math.floor(10000 + Math.random() * 90000)}`,
        dynamicPass: `dp_${Math.random().toString(36).substring(2, 15)}`,
        bossId: `${Math.floor(8000 + Math.random() * 1000)}`,
        gameAddress: '54.244.43.127:8600',
      };
      
      setSessionData(newSessionData);

      toast({
          title: "Recon Complete",
          description: "Session data automatically extracted and populated across tools.",
          className: "bg-accent text-accent-foreground border-accent",
      });

    } catch (e) {
      console.warn("Could not parse URL for recon simulation. Is it a valid URL?");
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLoadUrl();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="text-primary" />
          Site Webview & Automated Recon
        </CardTitle>
        <CardDescription>
          Load a target URL to begin automated reconnaissance. Extracted data will populate other tools.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full items-center space-x-2">
          <Input
            type="url"
            placeholder="https://example-game.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleLoadUrl}>
            <Activity className="mr-2" /> Load & Run Recon
          </Button>
        </div>
        <div className="mt-6 border rounded-lg overflow-hidden h-[800px]">
          {iframeUrl ? (
            <iframe
              src={iframeUrl}
              className="w-full h-full"
              title="Site Webview"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary">
              <p className="text-muted-foreground">Enter a URL to begin</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteWebview;
