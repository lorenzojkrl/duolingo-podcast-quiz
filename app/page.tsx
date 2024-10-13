"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import quizData from '@/data/quiz-data.json';

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (answer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Quiz Completed!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-lg mb-4">
              Your score: {score} out of {quizData.length}
            </p>
            <Progress value={(score / quizData.length) * 100} className="w-full" />
          </CardContent>
          <CardFooter>
            <Button onClick={resetQuiz} className="w-full">Restart Quiz</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {question.answers.map((answer, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                className={`w-full text-left justify-start ${
                  selectedAnswer
                    ? answer === question.correctAnswer
                      ? 'border-green-500 border-2'
                      : selectedAnswer === answer
                      ? 'border-red-500 border-2'
                      : ''
                    : ''
                }`}
                variant={selectedAnswer ? 'outline' : 'default'}
              >
                {answer}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="mb-2">
            Question {currentQuestion + 1} of {quizData.length}
          </p>
          <Progress value={((currentQuestion + 1) / quizData.length) * 100} className="w-full mb-4" />
          <Button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className="w-full"
          >
            {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}