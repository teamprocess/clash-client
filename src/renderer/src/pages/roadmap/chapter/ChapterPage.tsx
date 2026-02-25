import * as S from "./ChapterPage.style";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChapterRanking } from "@/features/chapter-ranking";
import { SectionProgress } from "@/features/section-progress";
import { Roadmap } from "@/features/chapter/components/Roadmap";
import { QuizModal } from "@/features/chapter/components/QuizModal";
import { useChapter } from "@/features/chapter/model/useChapter";
import { MajorEnum } from "@/entities/roadmap/section/model/section.types";
import { useEffect, useMemo } from "react";
import { useGetMyProfile } from "@/entities/user";
import { useMajorSectionQuery } from "@/entities/roadmap/section/api/query/useMajorSection.query";

export const ChapterPage = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const numericSectionId = sectionId ? Number(sectionId) : 0;

  const { chapterRef, domain, view, handlers } = useChapter(numericSectionId);

  const { data: myProfile } = useGetMyProfile();
  const major = myProfile?.major as MajorEnum | undefined;

  const { data: sectionData } = useMajorSectionQuery(major);

  const navigate = useNavigate();

  useEffect(() => {
    if (major == MajorEnum.NONE) navigate("/roadmap/major-choice");
  }, [major, navigate]);

  const orderedSections = useMemo(() => {
    if (!sectionData) return [];

    const { categories, sections } = sectionData;
    const byCategory = categories.flatMap(category =>
      sections.filter(section => section.category === category)
    );
    const remaining = sections.filter(section => !categories.includes(section.category));

    return [...byCategory, ...remaining];
  }, [sectionData]);

  const { prevSection, nextSection } = useMemo(() => {
    const currentIndex = orderedSections.findIndex(
      section => Number(section.id) === numericSectionId
    );
    if (currentIndex === -1) {
      return { prevSection: null, nextSection: null };
    }

    return {
      prevSection: orderedSections[currentIndex - 1] ?? null,
      nextSection: orderedSections[currentIndex + 1] ?? null,
    };
  }, [numericSectionId, orderedSections]);

  const handlePrevSection = () => {
    if (!prevSection || prevSection.locked) return;
    navigate(`/roadmap/${prevSection.id}`);
  };

  const handleNextSection = () => {
    if (!nextSection || nextSection.locked) return;
    navigate(`/roadmap/${nextSection.id}`);
  };

  if (!sectionId || isNaN(numericSectionId) || numericSectionId === 0) {
    return (
      <S.ChapterContainer>
        <div>잘못된 섹션 ID입니다.</div>
        <Link to="/roadmap">로드맵으로 돌아가기</Link>
      </S.ChapterContainer>
    );
  }

  if (domain.loading) {
    return (
      <S.ChapterContainer>
        <div>로딩 중...</div>
      </S.ChapterContainer>
    );
  }

  if (domain.error) {
    return (
      <S.ChapterContainer>
        <div>데이터를 불러올 수 없습니다: {domain.error}</div>
        <Link to="/roadmap">로드맵으로 돌아가기</Link>
      </S.ChapterContainer>
    );
  }

  return (
    <S.ChapterContainer>
      <S.ChapterScrollable ref={chapterRef}>
        {Array.from({ length: 340 }).map((_, idx) => (
          <S.Square key={idx} />
        ))}

        <S.RoadmapWrapper>
          <Roadmap nodes={domain.roadmapNodes} onSelectStage={handlers.handleSelectStage} />
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
        <S.ArrowButton
          onClick={handlePrevSection}
          $disabled={!prevSection || prevSection.locked}
          disabled={!prevSection || prevSection.locked}
          aria-label="이전 섹션"
        >
          <S.ArrowIcon $direction="left" />
        </S.ArrowButton>
        <S.CurrentSectionLabel>{domain.sectionTitle}</S.CurrentSectionLabel>
        <S.ArrowButton
          onClick={handleNextSection}
          $disabled={!nextSection || nextSection.locked}
          disabled={!nextSection || nextSection.locked}
          aria-label="다음 섹션"
        >
          <S.ArrowIcon $direction="right" />
        </S.ArrowButton>
      </S.CurrentSectionBox>

      {view.missionModalOpen && (
        <S.MissionContainer>
          <S.MissionBoxTop>
            <S.MissionTitle>{domain.currentStage.title}</S.MissionTitle>
            <S.MissionProgress>
              <S.MissionCurrentProgress>
                {domain.currentStage.currentProgress}
              </S.MissionCurrentProgress>
              /<S.MissionTotalMissions>{domain.currentStage.totalMissions}</S.MissionTotalMissions>
            </S.MissionProgress>
          </S.MissionBoxTop>
          <S.MissionList>
            {domain.currentStageMissions.map(mission => (
              <S.MissionBox
                key={mission.id}
                onClick={() => {
                  if (domain.currentStage.status === "locked") return;
                  handlers.handleMissionClick(mission.id);
                }}
              >
                {mission.completed ? <S.CompletedLogo /> : <S.NotCompletedLogo />}
                <S.MissionLabel>{mission.title}</S.MissionLabel>
              </S.MissionBox>
            ))}
          </S.MissionList>
        </S.MissionContainer>
      )}

      {view.currentMission && (
        <QuizModal
          isOpen={view.modalOpen}
          onClose={handlers.handleCloseQuizModal}
          currentMission={view.currentMission}
          onMissionComplete={handlers.handleMissionComplete}
        />
      )}
    </S.ChapterContainer>
  );
};
