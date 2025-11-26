'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Server, ShieldAlert, User, KeyRound, Globe } from 'lucide-react';
import { useSession } from "@/context/session-context";

const InfrastructureRecon = () => {
  const { sessionData } = useSession();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Server className="text-primary" /> Server Endpoints</CardTitle>
            <CardDescription>Passively gathered infrastructure data and API endpoints.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground">Configuration Endpoint</h4>
              <p className="text-sm text-muted-foreground">PROTOCOL: <span className="text-accent">HTTP GET</span></p>
              <code className="block mt-1 p-2 rounded-md bg-secondary font-code text-xs break-all">.../plat/config/hall/platName/config.json?=...</code>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Login WebSocket</h4>
              <p className="text-sm text-muted-foreground">PROTOCOL: <span className="text-accent">Custom WS (wl)</span></p>
              <code className="block mt-1 p-2 rounded-md bg-secondary font-code text-xs">
                {sessionData.gameAddress ? `ws://${sessionData.gameAddress}` : 'ws://[gameAddress]:[gamePort] (awaiting recon...)'}
              </code>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Global Message API</h4>
              <p className="text-sm text-muted-foreground">PROTOCOL: <span className="text-accent">ASHX</span></p>
              <code className="block mt-1 p-2 rounded-md bg-secondary font-code text-xs break-all">.../backStageUrl/ws/mobileinterface.ashx?action=getglobalmessage</code>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldAlert className="text-destructive"/> Client Security Warnings</CardTitle>
            <CardDescription>Critical vulnerabilities identified in the target application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Hardcoded AES Key/IV</AlertTitle>
              <AlertDescription>
                The entire login and game protocol is vulnerable due to a fixed AES Key/IV: <code className="font-code text-xs bg-destructive-foreground/20 p-1 rounded">pbc_efgfi1@l0nwp</code>.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Weak URL Parameter Encoding</AlertTitle>
              <AlertDescription>
                Sensitive session details (ID, password hash, tokens) are exposed via a weak custom substitution cipher in the game launch URL.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="text-primary"/> Decrypted Session & Recon Data</CardTitle>
          <CardDescription>Automatically extracted secrets from the webview session.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <User className="w-6 h-6 text-muted-foreground mt-1" />
            <div>
              <Label>User ID</Label>
              <p className={`font-code text-lg ${sessionData.userId ? 'text-accent' : 'text-muted-foreground'}`}>
                {sessionData.userId || 'Awaiting Recon...'}
              </p>
              <p className="text-xs text-muted-foreground">Extracted from URL parameters ('userid')</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <KeyRound className="w-6 h-6 text-muted-foreground mt-1" />
            <div>
              <Label>Dynamic Pass</Label>
              <p className={`font-code text-lg break-all ${sessionData.dynamicPass ? 'text-accent' : 'text-muted-foreground'}`}>
                {sessionData.dynamicPass || 'Awaiting Recon...'}
              </p>
              <p className="text-xs text-muted-foreground">Extracted from URL parameters ('dynamicpass')</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <User className="w-6 h-6 text-muted-foreground mt-1" />
            <div>
              <Label>Boss ID</Label>
              <p className={`font-code text-lg ${sessionData.bossId ? 'text-accent' : 'text-muted-foreground'}`}>
                {sessionData.bossId || 'Awaiting Recon...'}
              </p>
              <p className="text-xs text-muted-foreground">Extracted from URL parameters ('bossid')</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Globe className="w-6 h-6 text-muted-foreground mt-1" />
            <div>
              <Label>Game Address</Label>
              <p className={`font-code text-lg ${sessionData.gameAddress ? 'text-accent' : 'text-muted-foreground'}`}>
                {sessionData.gameAddress || 'Awaiting Recon...'}
              </p>
              <p className="text-xs text-muted-foreground">Extracted from game client configuration</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfrastructureRecon;
