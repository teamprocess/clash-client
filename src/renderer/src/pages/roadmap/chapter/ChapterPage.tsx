import * as S from "./ChapterPage.style";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChapterRanking } from "@/features/chapter-ranking";
import { SectionProgress } from "@/features/section-progress";
import { Roadmap } from "@/features/chapter/components/Roadmap";
import { QuizModal } from "@/features/chapter/components/QuizModal";
import { useChapter } from "@/features/chapter/model/useChapter";
import { sectionApi } from "@/entities/roadmap/section/api/sectionApi";
import { MajorEnum } from "@/entities/roadmap/section/model/section.types";
import { useEffect, useState } from "react";
import { authApi } from "@/entities/user";

export const ChapterPage = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const numericSectionId = sectionId ? Number(sectionId) : 0;

  const { chapterRef, domain, view, handlers } = useChapter(numericSectionId);

  const [major, setMajor] = useState<MajorEnum | null>(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    const myProfile = await authApi.getMyProfile();
    const myMajor = myProfile.data?.major as MajorEnum;
    const section = await sectionApi.getMajorSection({ major: myMajor });
    return { data: section.data, myMajor };
  };

  useEffect(() => {
    fetchData().then(res => {
      setMajor(res.myMajor);
    });
  }, []);

  useEffect(() => {
    if (major == MajorEnum.NONE) navigate("/roadmap/major-choice");
  }, [major, navigate]);

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
        {Array.from({ length: 300 }).map((_, idx) => (
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
        <S.ArrowIcon $direction="left" />
        <S.CurrentSectionLabel>{domain.sectionTitle}</S.CurrentSectionLabel>
        <S.ArrowIcon $direction="right" />
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
            {domain.currentStage.missions.map(mission => (
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
