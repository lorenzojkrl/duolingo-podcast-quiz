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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import episode151 from "@/data/episode_151.json";
import episode150 from "@/data/episode_150.json";
import episode149 from "@/data/episode_149.json";
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

export default function Home() {
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState<QuizData[]>([]);
  const [question, setQuestion] = useState<QuizData | null>(null);
  const [selectedDataSet, setSelectedDataSet] = useState("151");
  const [quizData, setQuizData] = useState<QuizData[]>(episode151.quiz);
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    if (!selectedDataSet) return;

    switch (selectedDataSet) {
      case "151":
        setQuizData(episode151.quiz);
        break;
      case "150":
        setQuizData(episode150.quiz);
        break;
      case "149":
        setQuizData(episode149.quiz);
        break;
    }

    const shuffledQuestions = shuffleArray([...quizData]);
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

  const resetQuiz = () => {
    setcurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setQuizStarted(false);

    switch (selectedDataSet) {
      case "151":
        setQuizData(episode151.quiz);
        break;
      case "150":
        setQuizData(episode150.quiz);
        break;
      case "149":
        setQuizData(episode149.quiz);
        break;
    }
    const shuffledQuestions = shuffleArray([...quizData]);
    setRandomQuestions(shuffledQuestions.slice(0, 10));
    setQuestion(shuffledQuestions[0]);
    setQuizStarted(true);
  };

  const shuffleArray = (array: typeof quizData) => {
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
        startQuiz={startQuiz}
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
        resetQuiz={resetQuiz}
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
