import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EpisodeInfo } from "@/data/episodesData";

interface SelectEpisodeProps {
  selectedDataSet: string;
  setSelectedDataSet: (value: string) => void;
  startQuiz: () => void;
  episodes: EpisodeInfo[];
}

const c = {
  selectEpisode: "Select Episode",
  startQuiz: "Start Quiz",
};

export default function SelectEpisode({
  selectedDataSet,
  setSelectedDataSet,
  startQuiz,
  episodes,
}: SelectEpisodeProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {c.selectEpisode}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedDataSet || undefined}
            onValueChange={(value) => setSelectedDataSet(value)}
          >
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder="Choose an episode" />
            </SelectTrigger>
            <SelectContent>
              {episodes.map((episode) => (
                <SelectItem key={episode.id} value={episode.id}>
                  {episode.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <Button
            onClick={startQuiz}
            className="w-full"
            disabled={!selectedDataSet}
          >
            {c.startQuiz}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
