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
import { Progress } from "@/components/ui/progress";
import { EpisodeInfo } from "@/data/episodesData";

interface QuizCompletedProps {
  score: number;
  totalQuestions: number;
  selectedDataSet: string;
  setSelectedDataSet: (value: string) => void;
  resetQuiz: () => void;
  episodes: EpisodeInfo[];
}

const c = {
  quizCompleted: "Quiz Completed!",
  yourScore: "Your score:",
  outOf: "out of",
  restartQuiz: "Restart Quiz",
};

export default function QuizCompleted({
  score,
  totalQuestions,
  selectedDataSet,
  setSelectedDataSet,
  resetQuiz,
  episodes,
}: QuizCompletedProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Select
            value={selectedDataSet}
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
        </CardHeader>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {c.quizCompleted}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg mb-4">
            {c.yourScore} {score} {c.outOf} {totalQuestions}
          </p>
          <Progress value={(score / totalQuestions) * 100} className="w-full" />
        </CardContent>
        <CardFooter>
          <Button onClick={resetQuiz} className="w-full">
            {c.restartQuiz}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
