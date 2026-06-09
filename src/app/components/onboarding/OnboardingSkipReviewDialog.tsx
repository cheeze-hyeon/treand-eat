import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

type OnboardingSkipReviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmSkip: () => void;
};

export default function OnboardingSkipReviewDialog({
  open,
  onOpenChange,
  onConfirmSkip,
}: OnboardingSkipReviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[320px] rounded-2xl border-2 border-[#2e211c] bg-white p-6 sm:max-w-[320px]">
        <DialogHeader className="gap-3 text-left sm:text-left">
          <DialogTitle className="text-xl font-bold text-[#2e211c]">
            지금 건너뛰면 기능이 제한됩니다
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-2 text-left text-[13px] leading-[20px] text-[#665a55]">
              <p className="font-semibold text-[#c06226]">아래 핵심 기능을 사용할 수 없게 됩니다:</p>
              <ul className="space-y-1.5 pl-1">
                <li>• <span className="font-medium text-[#2e211c]">만족할 확률</span> — 나와 취향이 비슷한 사람들이 만족한 비율을 볼 수 없어요</li>
                <li>• <span className="font-medium text-[#2e211c]">취향 기반 정렬</span> — 나와 비슷한 유저 트렌딧 지수순 정렬이 비활성화돼요</li>
                <li>• <span className="font-medium text-[#2e211c]">개인화 트렌딧 차트</span> — 홈의 트렌딧 차트가 내 취향을 반영하지 못해요</li>
              </ul>
              <p className="pt-0.5 text-[12px] text-[#9e9794]">리뷰 1개만 남겨도 취향 분석이 시작됩니다.</p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2 flex-col gap-2 sm:flex-col">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-11 w-full rounded-[10px] bg-[#2e211c] text-base font-bold text-white"
          >
            계속 작성하기
          </button>
          <button
            type="button"
            onClick={onConfirmSkip}
            className="h-11 w-full rounded-[10px] border-2 border-[#665a55] bg-white text-base text-[#665a55]"
          >
            그래도 건너뛰기
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
