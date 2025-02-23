"use client";

import * as React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { MessageSquare, Send, Skull } from "lucide-react";
import { Switch } from "~/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import Image from "next/image";

// Updated mock equipment data for BiS Protection Paladin Tank
const mockEquipment = {
  head: {
    name: "Felsteel Helm",
    rarity: "epic",
    description: "Forged from the essence of demons",
    stats: "+54 Stamina, +50 Defense Rating, +33 Dodge Rating",
    source: "Black Temple - Illidan Stormrage",
  },
  neck: {
    name: "Pendant of the Perilous",
    rarity: "epic",
    description: "A symbol of unwavering defense",
    stats: "+37 Stamina, +20 Defense Rating, +20 Dodge Rating",
    source: "Mount Hyjal - Azgalor",
  },
  shoulders: {
    name: "Pauldrons of the Forgotten Protector",
    rarity: "epic",
    description: "Shoulders that have weathered countless battles",
    stats: "+46 Stamina, +36 Defense Rating, +26 Dodge Rating",
    source: "Black Temple - Mother Shahraz",
  },
  chest: {
    name: "Chestguard of the Forgotten Protector",
    rarity: "epic",
    description: "A chestpiece that stands against all odds",
    stats: "+61 Stamina, +48 Defense Rating, +34 Dodge Rating",
    source: "Black Temple - The Illidari Council",
  },
  hands: {
    name: "Handguards of the Forgotten Protector",
    rarity: "epic",
    description: "Gauntlets that have turned aside countless blows",
    stats: "+46 Stamina, +36 Defense Rating, +26 Dodge Rating",
    source: "Mount Hyjal - Archimonde",
  },
  waist: {
    name: "Belt of Divine Guidance",
    rarity: "epic",
    description: "A belt infused with holy power",
    stats: "+49 Stamina, +34 Defense Rating, +26 Dodge Rating",
    source: "Black Temple - Reliquary of Souls",
  },
  legs: {
    name: "Legguards of the Forgotten Protector",
    rarity: "epic",
    description: "Leggings that have stood firm against evil",
    stats: "+61 Stamina, +48 Defense Rating, +34 Dodge Rating",
    source: "Black Temple - Illidan Stormrage",
  },
  feet: {
    name: "Boots of the Righteous Path",
    rarity: "epic",
    description: "Boots that never falter in the face of danger",
    stats: "+49 Stamina, +34 Defense Rating, +26 Dodge Rating",
    source: "Mount Hyjal - Rage Winterchill",
  },
  mainHand: {
    name: "Shard of the Fallen Star",
    rarity: "epic",
    description: "A mace forged from a fallen celestial body",
    stats: "+271 Armor, +38 Stamina, +20 Defense Rating",
    source: "Black Temple - Illidan Stormrage",
  },
  offHand: {
    name: "Aegis of the Vindicator",
    rarity: "epic",
    description: "A shield blessed by the Naaru",
    stats: "+3274 Armor, +45 Stamina, +19 Defense Rating",
    source: "Black Temple - Illidan Stormrage",
  },
};

const rarityColors = {
  legendary: "border-amber-500 bg-amber-950/20 hover:bg-amber-950/30",
  epic: "border-purple-500 bg-purple-950/20 hover:bg-purple-950/30",
  rare: "border-blue-500 bg-blue-950/20 hover:bg-blue-950/30",
  common: "border-gray-500 bg-gray-950/20 hover:bg-gray-950/30",
};

const rarityText = {
  legendary: "text-amber-400",
  epic: "text-purple-400",
  rare: "text-blue-400",
  common: "text-gray-400",
};

const diabloRarityColors = {
  legendary: "border-orange-500 bg-orange-950/20 hover:bg-orange-950/30",
  epic: "border-sky-500 bg-sky-950/20 hover:bg-sky-950/30",
  rare: "border-yellow-500 bg-yellow-950/20 hover:bg-yellow-950/30",
  common: "border-gray-500 bg-gray-950/20 hover:bg-gray-950/30",
};

const diabloRarityText = {
  legendary: "text-orange-400",
  epic: "text-sky-400",
  rare: "text-yellow-400",
  common: "text-gray-400",
};

export default function CharacterEquipment() {
  const [messages, setMessages] = React.useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = React.useState("");
  const [diabloMode, setDiabloMode] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = React.useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I can help you manage your equipment. What would you like to know about your current gear?",
        },
      ]);
    }, 1000);
  };

  const EquipmentSlot = ({
    slot,
    item,
  }: {
    slot: string;
    item: typeof mockEquipment.head;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`cursor-pointer overflow-hidden rounded-lg border-2 p-2 transition-colors ${
              diabloMode
                ? diabloRarityColors[
                    item.rarity as keyof typeof diabloRarityColors
                  ]
                : rarityColors[item.rarity as keyof typeof rarityColors]
            } ${diabloMode ? "texture-slot-dark" : "texture-slot"} `}
          >
            <div className={diabloMode ? "rotate-45 transform" : ""}>
              <div className={diabloMode ? "-rotate-45 transform" : ""}>
                <h3 className="mb-1 text-xs font-semibold capitalize">
                  {slot.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <p
                  className={`mb-1 text-sm font-medium ${
                    diabloMode
                      ? diabloRarityText[
                          item.rarity as keyof typeof diabloRarityText
                        ]
                      : rarityText[item.rarity as keyof typeof rarityText]
                  } `}
                >
                  {item.name}
                </p>
                <p className="text-xs text-gray-400">{item.description}</p>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-bold">{item.name}</p>
          <p className="text-sm">{item.description}</p>
          <p className="mt-1 text-xs">{item.stats}</p>
          <p className="mt-1 text-xs capitalize">Rarity: {item.rarity}</p>
          <p className="mt-1 text-xs">Source: {item.source}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div
      className={`min-h-screen ${diabloMode ? "texture-bg-dark bg-[#1a0a0a]" : "texture-bg bg-[#0a0f1c]"} p-6 text-gray-100`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between">
          <h1
            className={`text-2xl font-bold ${diabloMode ? "text-red-500" : "text-blue-500"}`}
          >
            Character Equipment
          </h1>
          <div className="flex items-center space-x-2">
            <span className={diabloMode ? "text-red-500" : "text-blue-500"}>
              Diablo Mode
            </span>
            <Switch
              checked={diabloMode}
              onCheckedChange={setDiabloMode}
              className={diabloMode ? "bg-red-500" : "bg-blue-500"}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Equipment Panel */}
          <div
            className={`lg:col-span-2 ${diabloMode ? "bg-[#2a0a0a]/80" : "bg-[#1a1f2c]/80"} rounded-lg border ${diabloMode ? "border-red-900" : "border-[#2a3040]"} relative overflow-hidden p-6 ${diabloMode ? "texture-bg-dark" : "texture-bg"}`}
          >
            {diabloMode && (
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-0 top-0 h-16 w-16 border-l-4 border-t-4 border-red-500 opacity-50"></div>
                <div className="absolute right-0 top-0 h-16 w-16 border-r-4 border-t-4 border-red-500 opacity-50"></div>
                <div className="absolute bottom-0 left-0 h-16 w-16 border-b-4 border-l-4 border-red-500 opacity-50"></div>
                <div className="absolute bottom-0 right-0 h-16 w-16 border-b-4 border-r-4 border-red-500 opacity-50"></div>
              </div>
            )}
            <div className="relative mx-auto max-w-[800px]">
              {/* Equipment Grid */}
              <div className="grid grid-cols-4 gap-2">
                {/* Left Column */}
                <div className="space-y-2">
                  <EquipmentSlot slot="head" item={mockEquipment.head} />
                  <EquipmentSlot slot="neck" item={mockEquipment.neck} />
                  <EquipmentSlot
                    slot="shoulders"
                    item={mockEquipment.shoulders}
                  />
                  <EquipmentSlot slot="chest" item={mockEquipment.chest} />
                </div>

                {/* Character Portrait */}
                <div className="col-span-2 flex items-center justify-center">
                  <div
                    className={`aspect-[3/4] w-full ${diabloMode ? "texture-portrait-dark bg-[#3a0a0a]" : "texture-portrait bg-[#2a3040]"} border-4 ${diabloMode ? "border-red-900" : "border-[#4a5060]"} overflow-hidden rounded-lg`}
                  >
                    <Image
                      src="https://v3.fal.media/files/monkey/2JBNu5gpWRUzTnA86QrSr.png"
                      alt="Character Portrait - Blood Elf Female Paladin"
                      className="h-full w-full object-cover"
                      width={300}
                      height={400}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-2">
                  <EquipmentSlot slot="hands" item={mockEquipment.hands} />
                  <EquipmentSlot slot="waist" item={mockEquipment.waist} />
                  <EquipmentSlot slot="legs" item={mockEquipment.legs} />
                  <EquipmentSlot slot="feet" item={mockEquipment.feet} />
                </div>
              </div>

              {/* Weapons (Below the portrait) */}
              <div className="mt-2 flex justify-center gap-2">
                <div className="w-1/2">
                  <EquipmentSlot
                    slot="mainHand"
                    item={mockEquipment.mainHand}
                  />
                </div>
                <div className="w-1/2">
                  <EquipmentSlot slot="offHand" item={mockEquipment.offHand} />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Panel */}
          <div
            className={`${diabloMode ? "texture-bg-dark bg-[#2a0a0a]/80" : "texture-bg bg-[#1a1f2c]/80"} rounded-lg border ${diabloMode ? "border-red-900" : "border-[#2a3040]"} flex h-[600px] flex-col p-6`}
          >
            <div className="mb-4 flex items-center gap-2">
              {diabloMode ? (
                <Skull className="h-5 w-5 text-red-500" />
              ) : (
                <MessageSquare className="h-5 w-5 text-blue-400" />
              )}
              <h2
                className={`text-lg font-semibold ${diabloMode ? "text-red-500" : "text-blue-400"}`}
              >
                Equipment Assistant
              </h2>
            </div>

            <ScrollArea className="mb-4 flex-1 pr-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`rounded-lg p-3 ${
                      message.role === "user"
                        ? diabloMode
                          ? "ml-4 bg-red-900/20"
                          : "ml-4 bg-blue-600/20"
                        : diabloMode
                          ? "mr-4 bg-gray-800/50"
                          : "mr-4 bg-gray-800/50"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your equipment..."
                className={`flex-1 ${diabloMode ? "border-red-700 bg-red-950/50" : "border-gray-700 bg-gray-900/50"}`}
              />
              <Button
                type="submit"
                size="icon"
                className={diabloMode ? "bg-red-700 hover:bg-red-600" : ""}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
