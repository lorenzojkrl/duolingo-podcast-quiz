"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import episode151 from "@/data/episode_151.json";
import episode150 from "@/data/episode_150.json";
import episode149 from "@/data/episode_149.json";
import episode148 from "@/data/episode_148.json";
import episode147 from "@/data/episode_147.json";
import SelectEpisode from "@/components/SelectEpisode";
import { episodes } from "@/data/episodesData";
import QuizCompleted from "@/components/QuizCompleted";

export type QuizData = {
  question: string;
  answers: string[];
  correctAnswer: string;
};

export type EpisodeData = {
  meta: {
    id: string;
    title: string;
    date: string;
  };
  quiz: QuizData[];
};

function getEpisodeData(selectedDataSet: string): EpisodeData | null {
  switch (selectedDataSet) {
    case "151":
      return episode151;
    case "150":
      return episode150;
    case "149":
      return episode149;
    case "148":
      return episode148;
    case "147":
      return episode147;
    default:
      return null;
  }
}

export default function Home() {
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState<QuizData[]>([]);
  const [question, setQuestion] = useState<QuizData | null>(null);
  const [selectedDataSet, setSelectedDataSet] = useState("151");
  const [quizStarted, setQuizStarted] = useState(false);

  const initializeQuiz = () => {
    if (!selectedDataSet) return;

    const selectedEpisodeData = getEpisodeData(selectedDataSet);
    if (!selectedEpisodeData) return;

    setcurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);

    const shuffledQuestions = shuffleArray([...selectedEpisodeData.quiz]);
    setRandomQuestions(shuffledQuestions.slice(0, 10));
    setQuestion(shuffledQuestions[0]);
    setQuizStarted(true);
  };

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (answer === randomQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex < randomQuestions.length - 1) {
      setcurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestion(randomQuestions[currentQuestionIndex + 1]);
    } else {
      setQuizCompleted(true);
    }
  };

  const shuffleArray = (array: QuizData[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const selectedEpisode = episodes.find((ep) => ep.id === selectedDataSet);

  if (!quizStarted) {
    return (
      <SelectEpisode
        selectedDataSet={selectedDataSet}
        setSelectedDataSet={setSelectedDataSet}
        startQuiz={initializeQuiz}
        episodes={episodes}
      />
    );
  }

  if (quizCompleted) {
    return (
      <QuizCompleted
        score={score}
        totalQuestions={randomQuestions.length}
        selectedDataSet={selectedDataSet}
        setSelectedDataSet={setSelectedDataSet}
        resetQuiz={initializeQuiz}
        episodes={episodes}
      />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardDescription className="text-center">
            {selectedEpisode?.title}
          </CardDescription>
          <CardTitle className="text-2xl font-bold text-center">
            {question?.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {question?.answers.map((answer, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                className={`w-full text-left justify-start ${
                  selectedAnswer
                    ? answer === question.correctAnswer
                      ? "border-green-500 border-2"
                      : selectedAnswer === answer
                      ? "border-red-500 border-2"
                      : ""
                    : ""
                }`}
                variant={selectedAnswer ? "outline" : "default"}
              >
                {answer}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="mb-2">
            Question {currentQuestionIndex + 1} of {randomQuestions.length}
          </p>
          <Progress
            value={((currentQuestionIndex + 1) / randomQuestions.length) * 100}
            className="w-full mb-4"
          />
          <Button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className="w-full"
          >
            {currentQuestionIndex === randomQuestions.length - 1
              ? "Finish"
              : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
