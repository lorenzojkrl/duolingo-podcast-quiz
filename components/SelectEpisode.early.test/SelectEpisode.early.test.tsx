import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { EpisodeInfo } from "@/data/episodesData";
import SelectEpisode from "../SelectEpisode";

// Mock components
const MockCard = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);
const MockCardContent = ({ children }: any) => <div>{children}</div>;
const MockCardFooter = ({ children }: any) => <div>{children}</div>;
const MockCardHeader = ({ children }: any) => <div>{children}</div>;
const MockCardTitle = ({ children }: any) => <div>{children}</div>;
const MockSelect = ({ children, onValueChange }: any) => (
  <div onClick={() => onValueChange("1")}>{children}</div>
);
const MockSelectContent = ({ children }: any) => <div>{children}</div>;
const MockSelectItem = ({ children }: any) => <div>{children}</div>;
const MockSelectTrigger = ({ children }: any) => <div>{children}</div>;
const MockSelectValue = ({ placeholder }: any) => <div>{placeholder}</div>;
const MockButton = ({ children, onClick, disabled }: any) => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

jest.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <MockCard>{children}</MockCard>
  ),
  CardContent: ({ children }: any) => (
    <MockCardContent>{children}</MockCardContent>
  ),
  CardFooter: ({ children }: any) => (
    <MockCardFooter>{children}</MockCardFooter>
  ),
  CardHeader: ({ children }: any) => (
    <MockCardHeader>{children}</MockCardHeader>
  ),
  CardTitle: ({ children }: any) => <MockCardTitle>{children}</MockCardTitle>,
}));

jest.mock("@/components/ui/select", () => ({
  Select: ({ children, onValueChange }: any) => (
    <MockSelect onValueChange={onValueChange}>{children}</MockSelect>
  ),
  SelectContent: ({ children }: any) => (
    <MockSelectContent>{children}</MockSelectContent>
  ),
  SelectItem: ({ children }: any) => (
    <MockSelectItem>{children}</MockSelectItem>
  ),
  SelectTrigger: ({ children }: any) => (
    <MockSelectTrigger>{children}</MockSelectTrigger>
  ),
  SelectValue: ({ placeholder }: any) => (
    <MockSelectValue placeholder={placeholder} />
  ),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, disabled }: any) => (
    <MockButton onClick={onClick} disabled={disabled}>
      {children}
    </MockButton>
  ),
}));

describe("SelectEpisode", () => {
  const mockSetSelectedDataSet = jest.fn();
  const mockStartQuiz = jest.fn();
  const mockEpisodes: EpisodeInfo[] = [
    { id: "1", title: "Episode 1" },
    { id: "2", title: "Episode 2" },
  ];

  describe("Happy Path", () => {
    it("should render the component with all elements", () => {
      render(
        <SelectEpisode
          selectedDataSet=""
          setSelectedDataSet={mockSetSelectedDataSet}
          startQuiz={mockStartQuiz}
          episodes={mockEpisodes}
        />
      );

      expect(screen.getByText("Select Episode")).toBeVisible();
      expect(screen.getByText("Choose an episode")).toBeInTheDocument();
      expect(screen.getByText("Start Quiz")).toBeVisible();
    });

    it("should call setSelectedDataSet when an episode is selected", () => {
      render(
        <SelectEpisode
          selectedDataSet=""
          setSelectedDataSet={mockSetSelectedDataSet}
          startQuiz={mockStartQuiz}
          episodes={mockEpisodes}
        />
      );

      fireEvent.click(screen.getByText("Choose an episode"));
      expect(mockSetSelectedDataSet).toHaveBeenCalledWith("1");
    });

    it("should enable the Start Quiz button when an episode is selected", () => {
      render(
        <SelectEpisode
          selectedDataSet="1"
          setSelectedDataSet={mockSetSelectedDataSet}
          startQuiz={mockStartQuiz}
          episodes={mockEpisodes}
        />
      );

      const startQuizButton = screen.getByText("Start Quiz");
      expect(startQuizButton).not.toBeDisabled();
    });

    it("should call startQuiz when the Start Quiz button is clicked", () => {
      render(
        <SelectEpisode
          selectedDataSet="1"
          setSelectedDataSet={mockSetSelectedDataSet}
          startQuiz={mockStartQuiz}
          episodes={mockEpisodes}
        />
      );

      fireEvent.click(screen.getByText("Start Quiz"));
      expect(mockStartQuiz).toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("should disable the Start Quiz button when no episode is selected", () => {
      render(
        <SelectEpisode
          selectedDataSet=""
          setSelectedDataSet={mockSetSelectedDataSet}
          startQuiz={mockStartQuiz}
          episodes={mockEpisodes}
        />
      );

      const startQuizButton = screen.getByText("Start Quiz");
      expect(startQuizButton).toBeDisabled();
    });

    it("should handle an empty episodes list gracefully", () => {
      render(
        <SelectEpisode
          selectedDataSet=""
          setSelectedDataSet={mockSetSelectedDataSet}
          startQuiz={mockStartQuiz}
          episodes={[]}
        />
      );

      expect(screen.getByText("Choose an episode")).toBeInTheDocument();
    });
  });
});
