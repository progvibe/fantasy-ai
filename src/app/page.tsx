"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import CharacterCreator from "~/components/character-creator";
import CharacterResult from "~/components/character-result";

export default function Home() {
  const [showCreator, setShowCreator] = useState(false);
  const [characterData, setCharacterData] = useState<any>(null);

  const handleCharacterCreated = (data: any, portraitUrl: string) => {
    setCharacterData({
      ...data,
      portraitUrl,
    });
    setShowCreator(false);
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4">
      {/* Background image with blur effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('~/night-forest-background.jpg')] bg-cover bg-fixed bg-center"></div>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
        {/* Optional: Fantasy overlay texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-black/30 mix-blend-overlay"></div>
      </div>

      <div className="container relative z-10 mx-auto w-full max-w-5xl">
        {!showCreator && !characterData ? (
          <Card className="rounded-lg border-4 border-amber-900/50 bg-black/70 p-8 shadow-2xl backdrop-blur-sm">
            <div className="text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-wide text-amber-500 md:text-6xl">
                Fantasy Character Creator
              </h1>
              <p className="mb-8 text-lg text-amber-200">
                Create your legendary hero and bring them to life with AI
              </p>
              <Button
                onClick={() => setShowCreator(true)}
                className="rounded-md border-2 border-amber-900 bg-gradient-to-b from-amber-600 to-amber-800 px-8 py-6 text-xl text-amber-100 shadow-lg hover:from-amber-500 hover:to-amber-700 hover:shadow-amber-900/20"
              >
                Begin Your Journey
              </Button>
            </div>
          </Card>
        ) : showCreator ? (
          <CharacterCreator onComplete={handleCharacterCreated} />
        ) : (
          <CharacterResult
            characterData={characterData}
            onReset={() => {
              setCharacterData(null);
              setShowCreator(false);
            }}
          />
        )}
      </div>
    </main>
  );
}
