// import * as S from "@/features/home/ui/compare/solvedac/CompareSolvedAc.style";
// import { GrowthRate } from "@/features/home/ui/compare/growthrate/GrowthRate";
// import { SolvedAcProps } from "@/features/home/model/useCompare";
//
// export const SolvedAc = ({ statsData }: SolvedAcProps) => {
//   return (
//     <S.ContentBox>
//       <S.Content>
//         <S.SubtitleBox>
//           <S.Subtitle>어제</S.Subtitle>
//           <S.DateBox>
//             <S.DateIcon />
//             <S.DateText>2025년 12월 21일</S.DateText>
//           </S.DateBox>
//         </S.SubtitleBox>
//         <S.InfoContainer>
//           <S.InfoContent>
//             <S.InfoTitle>점수</S.InfoTitle>
//             <S.CalculateBox>
//               <S.SolvedInfoBox>
//                 <S.SolvedAcIcon />
//                 <S.InfoSubtitleBox>
//                   <S.CountText>201</S.CountText>
//                   <S.InfoSubtitle>rate</S.InfoSubtitle>
//                 </S.InfoSubtitleBox>
//               </S.SolvedInfoBox>
//             </S.CalculateBox>
//           </S.InfoContent>
//           <S.InfoContent>
//             <S.InfoTitle>해결한 문제 수</S.InfoTitle>
//             <S.CalculateBox>
//               <S.SolvedInfoBox>
//                 <S.SolvedAcIcon />
//                 <S.InfoSubtitleBox>
//                   <S.CountText>3</S.CountText>
//                   <S.InfoSubtitle>solved</S.InfoSubtitle>
//                 </S.InfoSubtitleBox>
//               </S.SolvedInfoBox>
//             </S.CalculateBox>
//           </S.InfoContent>
//           <S.InfoContent style={{ border: "none" }}>
//             <S.InfoTitle>클래스</S.InfoTitle>
//             <S.CalculateBox>
//               <S.SolvedInfoBox>
//                 <S.SolvedAcIcon />
//                 <S.InfoSubtitleBox>
//                   <S.CountText>3</S.CountText>
//                   <S.InfoSubtitle>class</S.InfoSubtitle>
//                 </S.InfoSubtitleBox>
//               </S.SolvedInfoBox>
//             </S.CalculateBox>
//           </S.InfoContent>
//         </S.InfoContainer>
//       </S.Content>
//
//       {/* 분간 */}
//
//       <S.Content>
//         <S.SubtitleBox>
//           <S.Subtitle>오늘</S.Subtitle>
//           <S.DateBox>
//             <S.DateIcon />
//             <S.DateText>2025년 12월 22일</S.DateText>
//           </S.DateBox>
//         </S.SubtitleBox>
//         <S.InfoContainer>
//           <S.InfoContent>
//             <S.InfoTitle>점수</S.InfoTitle>
//             <S.CalculateBox>
//               <S.SolvedInfoBox>
//                 <S.SolvedAcIcon />
//                 <S.InfoSubtitleBox>
//                   <S.CountText>206</S.CountText>
//                   <S.InfoSubtitle>rate</S.InfoSubtitle>
//                 </S.InfoSubtitleBox>
//                 <GrowthRate statsData={statsData} type={"rate"} />
//               </S.SolvedInfoBox>
//             </S.CalculateBox>
//           </S.InfoContent>
//           <S.InfoContent>
//             <S.InfoTitle>해결한 문제 수</S.InfoTitle>
//             <S.CalculateBox>
//               <S.SolvedInfoBox>
//                 <S.SolvedAcIcon />
//                 <S.InfoSubtitleBox>
//                   <S.CountText>5</S.CountText>
//                   <S.InfoSubtitle>solved</S.InfoSubtitle>
//                 </S.InfoSubtitleBox>
//                 <GrowthRate statsData={statsData} type={"solved"} />
//               </S.SolvedInfoBox>
//             </S.CalculateBox>
//           </S.InfoContent>
//           <S.InfoContent style={{ border: "none" }}>
//             <S.InfoTitle>클래스</S.InfoTitle>
//             <S.CalculateBox>
//               <S.SolvedInfoBox>
//                 <S.SolvedAcIcon />
//                 <S.InfoSubtitleBox>
//                   <S.CountText>3</S.CountText>
//                   <S.InfoSubtitle>class</S.InfoSubtitle>
//                 </S.InfoSubtitleBox>
//                 <GrowthRate statsData={statsData} type={"class"} />
//               </S.SolvedInfoBox>
//             </S.CalculateBox>
//           </S.InfoContent>
//         </S.InfoContainer>
//       </S.Content>
//     </S.ContentBox>
//   );
// };
