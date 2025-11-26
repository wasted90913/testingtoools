import Header from "@/components/layout/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WsTrafficDecryptor from "@/components/dashboard/ws-traffic-decryptor";
import ExploitationPayloadGenerator from "@/components/dashboard/exploitation-payload-generator";
import InfrastructureRecon from "@/components/dashboard/infrastructure-recon";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Header />
      <div className="mt-8">
        <Tabs defaultValue="traffic-decryptor" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-secondary">
            <TabsTrigger value="traffic-decryptor">WS Traffic Decryptor</TabsTrigger>
            <TabsTrigger value="payload-generator">Exploitation Payload Generator</TabsTrigger>
            <TabsTrigger value="infra-recon">Infrastructure Recon</TabsTrigger>
          </TabsList>
          <TabsContent value="traffic-decryptor" className="mt-6">
            <WsTrafficDecryptor />
          </TabsContent>
          <TabsContent value="payload-generator" className="mt-6">
            <ExploitationPayloadGenerator />
          </TabsContent>
          <TabsContent value="infra-recon" className="mt-6">
            <InfrastructureRecon />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
