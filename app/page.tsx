"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import quizData from "@/data/quiz-data.json";

export default function Home() {
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState<typeof quizData>([]);
  const [question, setQuestion] = useState<(typeof quizData)[0] | null>(null);

  useEffect(() => {
    const shuffleArray = (array: typeof quizData) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const shuffledQuestions = shuffleArray([...quizData]);
    setRandomQuestions(shuffledQuestions.slice(0, 10));
    setQuestion(shuffledQuestions[0]);
  }, []);

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
  };

  if (quizCompleted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Quiz Completed!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-lg mb-4">
              Your score: {score} out of {randomQuestions.length}
            </p>
            <Progress
              value={(score / randomQuestions.length) * 100}
              className="w-full"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={resetQuiz} className="w-full">
              Restart Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
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
