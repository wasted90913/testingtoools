'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Unlock } from 'lucide-react';
import { decryptAes, encryptAes } from '@/lib/crypto';
import { ScrollArea } from '../ui/scroll-area';

type WsMessage = {
  id: number;
  timestamp: string;
  direction: 'up' | 'down';
  rawCiphertext: string;
  plaintextJson: string;
};

const initialMessages: WsMessage[] = [
  {
    id: 1,
    timestamp: new Date().toLocaleTimeString(),
    direction: 'down',
    rawCiphertext: encryptAes(JSON.stringify({ mainID: 2, subID: 101, data: { status: 'connected', serverTime: Date.now() } })),
    plaintextJson: JSON.stringify({ mainID: 2, subID: 101, data: { status: 'connected', serverTime: Date.now() } }),
  },
  {
    id: 2,
    timestamp: new Date(Date.now() + 1000).toLocaleTimeString(),
    direction: 'up',
    rawCiphertext: encryptAes(JSON.stringify({ mainID: 5, subID: 2, data: { id: 12345, token: 'session_token_abc' } })),
    plaintextJson: JSON.stringify({ mainID: 5, subID: 2, data: { id: 12345, token: 'session_token_abc' } }),
  },
];

const WsTrafficDecryptor = () => {
  const [messages, setMessages] = useState<WsMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const isUp = Math.random() > 0.5;
      const newMessage: WsMessage = {
        id: messages.length + 1,
        timestamp: new Date().toLocaleTimeString(),
        direction: isUp ? 'up' : 'down',
        rawCiphertext: encryptAes(JSON.stringify({ mainID: 10, subID: isUp ? 1 : 2, data: { ping: Date.now() } })),
        plaintextJson: JSON.stringify({ mainID: 10, subID: isUp ? 1 : 2, data: { ping: Date.now() } }),
      };
      setMessages(prev => [newMessage, ...prev].slice(0, 50));
    }, 5000);
    return () => clearInterval(interval);
  }, [messages.length]);

  const handleDecrypt = () => {
    const decrypted = decryptAes(inputText);
    setOutputText(decrypted);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Intercept Stream</CardTitle>
          <CardDescription>Live log of intercepted and decrypted WebSocket traffic.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full pr-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Timestamp</TableHead>
                  <TableHead className="w-[80px]">Direction</TableHead>
                  <TableHead>Raw Ciphertext (Base64)</TableHead>
                  <TableHead className="text-right">Plaintext</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map(msg => (
                  <TableRow key={msg.id}>
                    <TableCell className="font-mono text-xs">{msg.timestamp}</TableCell>
                    <TableCell>
                      {msg.direction === 'up' ? (
                        <Badge variant="outline" className="border-accent text-accent">
                          <ArrowUp className="w-3 h-3 mr-1" /> UP
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-primary text-primary">
                          <ArrowDown className="w-3 h-3 mr-1" /> DOWN
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-code text-xs truncate max-w-xs">{msg.rawCiphertext}</TableCell>
                    <TableCell className="text-right">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-none">
                          <AccordionTrigger className="p-2 hover:no-underline justify-end font-code text-xs">View JSON</AccordionTrigger>
                          <AccordionContent>
                            <pre className="mt-2 w-full rounded-md bg-secondary p-4 text-left font-code text-xs whitespace-pre-wrap">
                              {JSON.stringify(JSON.parse(msg.plaintextJson), null, 2)}
                            </pre>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Decryption Quick Verify</CardTitle>
          <CardDescription>Manually decrypt any intercepted Base64 string.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <label htmlFor="input-ciphertext" className="text-sm font-medium text-muted-foreground">Input Ciphertext (Base64)</label>
            <Textarea
              id="input-ciphertext"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Paste any intercepted Base64 string."
              className="mt-2 font-code h-32"
            />
          </div>
          <Button onClick={handleDecrypt} className="w-full bg-primary hover:bg-primary/90">
            <Unlock className="w-4 h-4 mr-2" />
            Decrypt with Exposed Key
          </Button>
          <div>
            <label htmlFor="output-plaintext" className="text-sm font-medium text-muted-foreground">Decrypted Plaintext</label>
            <pre className="mt-2 h-64 w-full rounded-md bg-secondary p-4 font-code text-xs whitespace-pre-wrap overflow-auto">
              {outputText || '// Output will appear here...'}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WsTrafficDecryptor;
