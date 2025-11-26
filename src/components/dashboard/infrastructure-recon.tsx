import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Server, ShieldAlert } from 'lucide-react';

const InfrastructureRecon = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <code className="block mt-1 p-2 rounded-md bg-secondary font-code text-xs">ws://[gameAddress]:[gamePort]</code>
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

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Unverified Custom Protocol</AlertTitle>
            <AlertDescription>
              The game protocol relies on an unverified custom protocol ('wl') over WebSocket, which lacks integrity checks.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfrastructureRecon;
