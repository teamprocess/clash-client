export interface PreviewChapter {
  id: number;
  title: string;
  description: string;
}

export interface GetSectionPreviewResponse {
  id: number;
  title: string;
  description: string;
  totalChapters: number;
  chapters: PreviewChapter[];
  keyPoints: string[];
}

export interface PreviewStep {
  id: number;
  tooltip: string;
  description: string;
}

export interface PreviewData {
  id: number;
  title: string;
  intro: string;
  steps: PreviewStep[];
  targets: string[];
}
