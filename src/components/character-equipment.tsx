"use client";

import {
  rarityColors,
  rarityText,
  diabloRarityColors,
  diabloRarityText,
  mockEquipment,
} from "~/data/equipment-data";

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
    item: typeof mockEquipment.mainHand;
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
              <div className="grid grid-cols-3 gap-4">
                {/* Character Portrait */}
                <div className="col-span-1 flex items-center justify-center">
                  <div
                    className={`aspect-[3/4] w-full max-w-[300px] ${
                      diabloMode ? "texture-portrait-dark bg-[#3a0a0a]" : "texture-portrait bg-[#2a3040]"
                    } border-4 ${
                      diabloMode ? "border-red-900" : "border-[#4a5060]"
                    } overflow-hidden rounded-lg`}
                  >
                    <Image
                      src="https://v3.fal.media/files/monkey/2JBNu5gpWRUzTnA86QrSr.png"
                      alt="Character Portrait - Blood Elf Female Paladin"
                      className="h-full w-full object-cover"
                      width={400}
                      height={533}
                    />
                  </div>
                </div>

                {/* Equipment Slots */}
                <div className="col-span-2 flex flex-col justify-center gap-4">
                  {/* Armor Set */}
                  <div className="w-full">
                    <EquipmentSlot slot="armorSet" item={mockEquipment.armorSet} />
                  </div>

                  {/* Weapons */}
                  <div className="flex justify-between gap-4">
                    <div className="w-1/2">
                      <EquipmentSlot slot="mainHand" item={mockEquipment.mainHand} />
                    </div>
                    <div className="w-1/2">
                      <EquipmentSlot slot="offHand" item={mockEquipment.offHand} />
                    </div>
                  </div>
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
