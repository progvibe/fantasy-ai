"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { ArrowLeft, Download, Share2 } from "lucide-react";

import Image from "next/image";

export default function CharacterResult({
  characterData,
  onReset,
}: {
  characterData: any;
  onReset: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (characterData) {
      console.log("Character data changed, resetting loading state");
      console.log(characterData);
      setIsLoading(false);
    }
  }, [characterData]);

  // Generate a prompt for the AI based on character data
  const generatePrompt = () => {
    return `A fantasy ${characterData.race} ${characterData.class}, ${characterData.appearance}, age ${characterData.age}`;
  };

  return (
    <Card className="w-full rounded-lg border-4 border-amber-900/50 bg-black/70 p-8 shadow-2xl backdrop-blur-sm">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-4xl font-bold text-amber-500">
          {characterData.name}
        </h1>
        <p className="text-lg capitalize text-amber-200">
          Level 1 {characterData.race} {characterData.class}
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-8 md:flex-row">
        <div className="flex flex-1 justify-center">
          {isLoading ? (
            <div className="flex h-[400px] w-full items-center justify-center rounded-lg border-2 border-amber-900/30 bg-black/50">
              <div className="animate-pulse text-xl text-amber-500">
                Conjuring your character...
              </div>
            </div>
          ) : (
            <div className="relative">
              {characterData.portraitUrl ? (
                <Image
                  src={characterData.portraitUrl}
                  alt={characterData.name}
                  className="max-h-[400px] rounded-lg border-4 border-amber-900/50 object-cover shadow-lg"
                  width={400}
                  height={400}
                />
              ) : (
                <div className="flex h-[400px] w-full items-center justify-center rounded-lg border-2 border-amber-900/30 bg-black/50">
                  <div className="animate-pulse text-xl text-amber-500">
                    Conjuring your character...
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-amber-900 bg-black/70 text-amber-200 hover:bg-amber-900/30"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-amber-900 bg-black/70 text-amber-200 hover:bg-amber-900/30"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4 text-amber-200">
          <div>
            <h3 className="mb-1 text-xl font-semibold text-amber-500">
              Character Details
            </h3>
            <div className="mb-4 grid grid-cols-2 gap-2">
              <div className="font-medium text-amber-300">Race:</div>
              <div className="capitalize">{characterData.race}</div>
              <div className="font-medium text-amber-300">Class:</div>
              <div className="capitalize">{characterData.class}</div>
              <div className="font-medium text-amber-300">Age:</div>
              <div>{characterData.age} years</div>
            </div>
          </div>

          <div>
            <h3 className="mb-1 text-xl font-semibold text-amber-500">
              Appearance
            </h3>
            <p className="text-amber-200">
              {characterData.appearance || "No description provided."}
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-xl font-semibold text-amber-500">
              Background
            </h3>
            <p className="text-amber-200">
              {characterData.background || "No background story provided."}
            </p>
          </div>

          {!isLoading && (
            <div className="pt-2">
              <h3 className="mb-1 text-xl font-semibold text-amber-500">
                AI Prompt Used
              </h3>
              <p className="rounded border border-amber-900/30 bg-black/30 p-2 text-sm text-amber-300/70">
                {generatePrompt()}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onReset}
          variant="outline"
          className="border-amber-700 text-amber-200 hover:bg-amber-900/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Create Another Character
        </Button>
      </div>
    </Card>
  );
}
