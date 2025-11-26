import { Binary } from 'lucide-react';

const Header = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <Binary className="w-10 h-10 text-accent" />
        <h1 className="text-5xl font-bold font-headline tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-accent">
          CipherLens
        </h1>
      </div>
      <p className="mt-2 text-lg text-muted-foreground">
        Ciphertext Interception & Exploitation Framework
      </p>
    </header>
  );
};

export default Header;
