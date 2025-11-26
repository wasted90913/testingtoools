'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Globe, ArrowRight } from 'lucide-react';

const SiteWebview = () => {
  const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
  const [iframeUrl, setIframeUrl] = useState('https://www.google.com/webhp?igu=1');

  const handleLoadUrl = () => {
    let finalUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      finalUrl = 'https://' + url;
    }
    setIframeUrl(finalUrl);
  };
  
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
          Site Webview
        </CardTitle>
        <CardDescription>
          Enter a URL to view the target website. Note: Some sites may not load due to security policies (X-Frame-Options).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full items-center space-x-2">
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleLoadUrl}>
            <ArrowRight className="mr-2" /> Load Site
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
