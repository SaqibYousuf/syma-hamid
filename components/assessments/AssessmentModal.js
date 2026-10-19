"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AssessmentIntro from "@/components/assessments/AssessmentIntro";
import AssessmentQuestion from "@/components/assessments/AssessmentQuestion";
import PatternProfilesView from "@/components/assessments/AssessmentPatternProfile";
import PatternResultView from "@/components/assessments/AssessmentPatternResultView";
import PatternIdentityView from "./AssessmentPatternIdentityView";

const TOTAL_QUESTIONS = 12;

const createInitialAnswers = () =>
    Array.from({ length: TOTAL_QUESTIONS }, (_, index) => ({
        questionId: index + 1,
        selectedOptionId: null,
        selectedAnswer: null,
    }));

export default function AssessmentModal({ open, onOpenChange }) {
    const [screen, setScreen] = useState("PatternProfile");
    const [questionNumber, setQuestionNumber] = useState(1);
    const [answers, setAnswers] = useState(createInitialAnswers);

    const handleBegin = () => {
        setScreen("question");
    };

    const handleSelect = (questionId, optionId, answerText) => {
        setAnswers((previousAnswers) =>
            previousAnswers.map((item) =>
                item.questionId === questionId
                    ? {
                        ...item,
                        selectedOptionId: optionId,
                        selectedAnswer: answerText,
                    }
                    : item
            )
        );
    };

    const handlePrevious = () => {
        if (questionNumber === 1) {
            setScreen("intro");
            return;
        }

        setQuestionNumber((previous) => previous - 1);
    };
    const handleBack = () => {
        if (screen === "PatternIdentityView") {
            setScreen("PatternResultView");
            return;
        } else if (screen === "PatternResultView") {
            setScreen("PatternProfile");
        } else if (screen === "PatternProfile") {
            setScreen("question");
            setQuestionNumber(TOTAL_QUESTIONS);
        } else if (screen === "question") {
            if (questionNumber > 1) {
                setQuestionNumber((previous) => previous - 1);
            } else {
                setScreen("intro");
            }
        }
    };
    const handleClose = () => {
        onOpenChange(false);
        setScreen("intro");
        setQuestionNumber(1);
        setAnswers(createInitialAnswers());
    };

    const handleNext = () => {
        const currentAnswer = answers.find(
            (item) => item.questionId === questionNumber
        );

        if (!currentAnswer?.selectedOptionId) return;

        if (questionNumber < TOTAL_QUESTIONS) {
            setQuestionNumber((previous) => previous + 1);
            return;
        }

        // All 12 responses are available in the answers state.
        // Add submission logic here when ready.
        setScreen("PatternProfile");
        console.log("Assessment responses:", answers);
    };

    const handleOpenChange = (isOpen) => {
        onOpenChange(isOpen);

        if (!isOpen) {
            setScreen("intro");
            setQuestionNumber(1);
            setAnswers(createInitialAnswers());
        }
    };
    const handleShowResult = () => {
        if (screen === "PatternProfile") {
            setScreen("PatternResultView");
        } else if (screen === "PatternResultView") {
            setScreen("PatternIdentityView");
        }
    };
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="
                flex w-[90vw]! max-w-215! flex-col
                max-h-[90dvh] overflow-y-auto overscroll-contain
                rounded-[24px] border-0 p-0
                text-[#EFECE6] shadow-2xl ring-1 ring-white/10
                sm:max-h-[calc(100dvh-40px)]
                sm:rounded-[30px]
                lg:rounded-[34px]"
            >
                <div className="min-h-full bg-cover bg-center bg-no-repeat">
                    {screen === "intro" ? (
                        <AssessmentIntro
                            onBegin={handleBegin}
                            onBack={() => onOpenChange(false)}
                        />
                    ) : screen === "PatternProfile" ? (
                        <PatternProfilesView
                            onBack={handleBack}
                            onShowResult={handleShowResult}
                        />
                    ) : screen === "PatternResultView" ? (
                        <PatternResultView onBack={handleBack} onShowResult={handleShowResult} />
                    ) : screen === "PatternIdentityView" ? (
                        <PatternIdentityView onBack={handleBack} />
                    ) : (
                        <AssessmentQuestion
                            questionNumber={questionNumber}
                            totalQuestions={TOTAL_QUESTIONS}
                            selectedOption={
                                answers[questionNumber - 1]?.selectedOptionId ?? null
                            }
                            onSelect={(optionId, answerText) =>
                                handleSelect(questionNumber, optionId, answerText)}
                            onPrevious={handlePrevious}
                            onNext={handleNext}
                            onBack={handleBack}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
