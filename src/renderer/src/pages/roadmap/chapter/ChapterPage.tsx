import * as S from "./ChapterPage.style";
import { useEffect, useRef, useState } from "react";
import { ChapterRanking } from "@/features/chapter-ranking";
import { SectionProgress } from "@/features/section-progress";
import { Link } from "react-router-dom";
import { Roadmap } from "@/features/chapter/components/Roadmap";
import { Stage, stagesData } from "@/features/chapter/mocks/missionData";
import { Modal } from "@/shared/ui/modal/Modal";

const User = {
  currentSection: "리액트 초급",
};

export const ChapterPage = () => {
  const chapterRef = useRef<HTMLDivElement>(null);
  const [currentStage, setCurrentStage] = useState<Stage>(stagesData[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const currentQuestion = currentStage.questions[currentIndex];
  const selectedChoiceId = answers[currentIndex];

  const handleSelectChoice = (choiceId: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: choiceId,
    }));
  };

  const handleMissionClick = (completed: boolean) => {
    if (completed) return;
    setCurrentIndex(0);
    setAnswers({});
    setModalOpen(true);
  };

  const handleScroll = () => {
    if (!chapterRef.current) return;
    const child = chapterRef.current.childNodes.item(0) as HTMLDivElement;
    const scrolledSize = chapterRef.current.scrollTop + chapterRef.current.offsetHeight;

    const canScroll = scrolledSize <= chapterRef.current.scrollHeight - child.offsetWidth;
    if (!canScroll)
      chapterRef.current.scrollTo(
        chapterRef.current.scrollWidth,
        chapterRef.current.scrollHeight - chapterRef.current.offsetHeight - child.offsetWidth
      );
  };

  useEffect(() => {
    if (!chapterRef.current) return;
    chapterRef.current.scrollTo(chapterRef.current.scrollWidth, chapterRef.current.scrollHeight);
  }, []);

  useEffect(() => {
    if (!chapterRef.current) return;
    const chapter = chapterRef.current;
    chapter.addEventListener("scroll", handleScroll);
    return () => {
      chapter.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <S.ChapterContainer>
      <S.ChapterScrollable ref={chapterRef}>
        {Array(300)
          .fill(null)
          .map((_, idx) => (
            <S.Square key={idx} />
          ))}
        <S.RoadmapWrapper>
          <Roadmap stageSetFn={setCurrentStage} />
        </S.RoadmapWrapper>
      </S.ChapterScrollable>

      <ChapterRanking page="chapter" />
      <SectionProgress />

      <Link to="/roadmap">
        <S.PreviousBox>
          <S.PreviousIcon />
          <S.PreviousLabel>이전으로</S.PreviousLabel>
        </S.PreviousBox>
      </Link>

      <S.CurrentSectionBox>
        <S.ArrowIcon $direction="left" />
        <S.CurrentSectionLabel>{User.currentSection}</S.CurrentSectionLabel>
        <S.ArrowIcon $direction="right" />
      </S.CurrentSectionBox>

      <S.MissionContainer>
        <S.MissionBoxTop>
          <S.MissionTitle>{currentStage.title}</S.MissionTitle>
          <S.MissionProgress>
            <S.MissionCurrentProgress>{currentStage.currentProgress}</S.MissionCurrentProgress>/
            <S.MissionTotalMissions>{currentStage.totalMissions}</S.MissionTotalMissions>
          </S.MissionProgress>
        </S.MissionBoxTop>

        <S.MissionList>
          {currentStage.missions.map(mission => (
            <S.MissionBox key={mission.id} onClick={() => handleMissionClick(mission.completed)}>
              {mission.completed ? <S.CompletedLogo /> : <S.NotCompletedLogo />}
              <S.MissionLabel>{mission.title}</S.MissionLabel>
            </S.MissionBox>
          ))}
        </S.MissionList>
      </S.MissionContainer>

      <Modal
        $width={25}
        $height={34}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        gap={3}
      >
        <S.ModalTop>
          <S.ProgressBarWrapper>
            <S.BarBackground>
              <S.BarActive $fill={((currentIndex + 1) / currentStage.questions.length) * 100} />
            </S.BarBackground>
            <S.ProgressLabelBox>
              <S.CurrentProgress>{currentIndex + 1}</S.CurrentProgress>/
              <S.TotalQuestions>{currentStage.questions.length}</S.TotalQuestions>
            </S.ProgressLabelBox>
          </S.ProgressBarWrapper>

          <S.QuestionWrapper>
            <S.QuestionTitle>
              <S.QuestionPrefix>Q. </S.QuestionPrefix>
              {currentQuestion.title}
            </S.QuestionTitle>
          </S.QuestionWrapper>
        </S.ModalTop>

        <S.ModalBody>
          <S.ButtonGroup>
            {currentQuestion.choices.map(choice => (
              <S.AnswerOption
                key={choice.id}
                $selected={selectedChoiceId === choice.id}
                onClick={() => handleSelectChoice(choice.id)}
              >
                {choice.text}
              </S.AnswerOption>
            ))}

            <S.ConfirmButton
              onClick={() => {
                if (selectedChoiceId == null) return;

                if (currentIndex < currentStage.questions.length - 1) {
                  setCurrentIndex(prev => prev + 1);
                } else {
                  setModalOpen(false);
                }
              }}
            >
              선택 완료하기
            </S.ConfirmButton>
          </S.ButtonGroup>
        </S.ModalBody>
      </Modal>
    </S.ChapterContainer>
  );
};
