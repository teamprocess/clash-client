import * as S from "./ChapterPage.style";
import { useEffect, useRef, useState } from "react";
import { ChapterRanking } from "@/features/chapter-ranking";
import { SectionProgress } from "@/features/section-progress";
import { Link } from "react-router-dom";
import { Roadmap } from "@/features/chapter/components/Roadmap";
import { Stage, stagesData } from "@/features/chapter/mocks/missionData";
import { Modal } from "@/shared/ui/modal/Modal";
import { questionData } from "@/features/chapter/mocks/questionData";

const User = {
  currentSection: "리액트 초급",
};

export const ChapterPage = () => {
  const chapterRef = useRef<HTMLDivElement>(null);
  const [currentStage, setCurrentStage] = useState<Stage>(stagesData[0]);
  const [modalOpen, setModalOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questionData[currentIndex];

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
  }, [chapterRef]);

  useEffect(() => {
    if (!chapterRef.current) return;
    const chapter = chapterRef.current;
    chapter.addEventListener("scroll", handleScroll);
    return () => {
      chapter.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <S.ChapterContainer>
      <S.ChapterScrollable ref={chapterRef}>
        {Array(300)
          .fill(null)
          .map((_, idx) => (
            <S.Square key={idx}></S.Square>
          ))}
        <S.RoadmapWrapper>
          <Roadmap stageSetFn={setCurrentStage} />
        </S.RoadmapWrapper>
      </S.ChapterScrollable>
      <ChapterRanking page={"chapter"} />
      <SectionProgress />
      <Link to="/roadmap">
        <S.PreviousBox>
          <S.PreviousIcon />
          <S.PreviousLabel>이전으로</S.PreviousLabel>
        </S.PreviousBox>
      </Link>
      <S.CurrentSectionBox>
        <S.ArrowIcon $direction={"left"} />
        <S.CurrentSectionLabel>{User.currentSection}</S.CurrentSectionLabel>
        <S.ArrowIcon $direction={"right"} />
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
            <S.MissionBox key={mission.id}>
              {mission.completed ? <S.CompletedLogo /> : <S.NotCompletedLogo />}
              <S.MissionLabel>{mission.title}</S.MissionLabel>
            </S.MissionBox>
          ))}
        </S.MissionList>
      </S.MissionContainer>
      <Modal $width={24} $height={32} isOpen={modalOpen} onClose={closeModal} gap={2}>
        <S.ModalTop>
          <S.ProgressBarWrapper>
            <S.BarBackground>
              <S.BarActive $fill={((currentIndex + 1) / questionData.length) * 100} />
            </S.BarBackground>
            <S.ProgressLabelBox>
              <S.CurrentProgress>{currentIndex + 1}</S.CurrentProgress>/
              <S.TotalQuestions>{questionData.length}</S.TotalQuestions>
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
              <S.AnswerOption key={choice.id}>{choice.text}</S.AnswerOption>
            ))}

            <S.ConfirmButton
              onClick={() => {
                if (currentIndex < questionData.length - 1) {
                  setCurrentIndex(prev => prev + 1);
                } else {
                  closeModal();
                }
              }}
            >
              다음
            </S.ConfirmButton>
          </S.ButtonGroup>
        </S.ModalBody>
      </Modal>
    </S.ChapterContainer>
  );
};
