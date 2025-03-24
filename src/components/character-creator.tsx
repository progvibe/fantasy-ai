"use client";

import { useState, useTransition } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import { Textarea } from "~/components/ui/textarea";
import { ArrowLeft, ArrowRight, Wand2 } from "lucide-react";
import { generateCharacterPortrait } from "~/utils/fal-utils";
import type { FC } from "react";

const questions = [
  {
    id: "name",
    title: "What is your character's name?",
    component: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }) => (
      <div className="space-y-2">
        <Label htmlFor="name" className="text-lg text-amber-200">
          Character Name
        </Label>
        <Input
          id="name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-amber-900/50 bg-black/50 text-amber-100"
          placeholder="Enter a name..."
        />
      </div>
    ),
  },
  {
    id: "race",
    title: "Choose your character's race",
    component: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }) => (
      <div className="space-y-4">
        <Label className="text-lg text-amber-200">Character Race</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="border-amber-900/50 bg-black/50 text-amber-100">
            <SelectValue placeholder="Select a race" />
          </SelectTrigger>
          <SelectContent className="border-amber-900/50 bg-black text-amber-100">
            <SelectItem value="human">Human</SelectItem>
            <SelectItem value="elf">Elf</SelectItem>
            <SelectItem value="dwarf">Dwarf</SelectItem>
            <SelectItem value="orc">Orc</SelectItem>
            <SelectItem value="undead">Undead</SelectItem>
            <SelectItem value="troll">Troll</SelectItem>
          </SelectContent>
        </Select>
      </div>
    ),
  },
  {
    id: "class",
    title: "Select your character's class",
    component: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }) => (
      <div className="space-y-4">
        <Label className="text-lg text-amber-200">Character Class</Label>
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="grid grid-cols-2 gap-4"
        >
          {["warrior", "mage", "hunter", "priest", "rogue", "paladin"].map(
            (classType) => (
              <div key={classType} className="flex items-start space-x-2">
                <RadioGroupItem
                  value={classType}
                  id={classType}
                  className="border-amber-500 text-amber-500"
                />
                <Label
                  htmlFor={classType}
                  className="cursor-pointer font-medium capitalize text-amber-200"
                >
                  {classType}
                </Label>
              </div>
            ),
          )}
        </RadioGroup>
      </div>
    ),
  },
  {
    id: "appearance",
    title: "Describe your character's appearance",
    component: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }) => (
      <div className="space-y-2">
        <Label htmlFor="appearance" className="text-lg text-amber-200">
          Physical Appearance
        </Label>
        <Textarea
          id="appearance"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[120px] border-amber-900/50 bg-black/50 text-amber-100"
          placeholder="Describe hair color, eye color, distinctive features, etc..."
        />
      </div>
    ),
  },
  {
    id: "age",
    title: "How old is your character?",
    component: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }) => (
      <div className="space-y-4">
        <Label className="text-lg text-amber-200">Character Age: {value}</Label>
        <Slider
          defaultValue={[Number.parseInt(value) || 30]}
          max={1000}
          min={18}
          step={1}
          onValueChange={(vals) => onChange(vals[0].toString())}
          className="py-4"
        />
      </div>
    ),
  },
  {
    id: "background",
    title: "What is your character's background story?",
    component: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }) => (
      <div className="space-y-2">
        <Label htmlFor="background" className="text-lg text-amber-200">
          Character Background
        </Label>
        <Textarea
          id="background"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[150px] border-amber-900/50 bg-black/50 text-amber-100"
          placeholder="Tell us about your character's origins and history..."
        />
      </div>
    ),
  },
];

const CharacterCreator: FC<{
  onComplete: (data: Record<string, string>, portraitUrl: string) => void;
}> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    race: "",
    class: "",
    appearance: "",
    age: "30",
    background: "",
  });
  const [isPending, startTransition] = useTransition();

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/generate-portrait", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to generate character portrait");
        }

        console.log("Response:", response);

        const { portraitUrl } = await response.json();
        console.log("Portrait URL:", portraitUrl);
        onComplete(formData, portraitUrl);
      } catch (error) {
        console.error("Error generating character portrait:", error);
      }
    });
  };

  const currentQuestion = questions[currentStep];
  const Component = currentQuestion.component;
  const isLastStep = currentStep === questions.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <Card className="w-full rounded-lg border-4 border-amber-900/50 bg-black/70 p-8 shadow-2xl backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="mb-2 text-3xl font-bold text-amber-500">
          {currentQuestion.title}
        </h2>
        <div className="h-2 w-full overflow-hidden rounded-full bg-amber-900/30">
          <div
            className="h-full bg-amber-500 transition-all duration-300 ease-in-out"
            style={{
              width: `${((currentStep + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="mb-8">
        <Component
          value={formData[currentQuestion.id] || ""}
          onChange={(value) => handleChange(currentQuestion.id, value)}
        />
      </div>

      <div className="flex justify-between">
        <Button
          onClick={handleBack}
          disabled={isFirstStep}
          variant="outline"
          className={`border-amber-700 text-amber-200 ${isFirstStep ? "opacity-50" : "hover:bg-amber-900/20"}`}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Button
          onClick={handleNext}
          className="border-2 border-amber-900 bg-gradient-to-b from-amber-600 to-amber-800 text-amber-100 hover:from-amber-500 hover:to-amber-700"
          disabled={isPending}
        >
          {isLastStep ? (
            <>
              <Wand2 className="mr-2 h-4 w-4" /> Generate Character
            </>
          ) : (
            <>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default CharacterCreator;
