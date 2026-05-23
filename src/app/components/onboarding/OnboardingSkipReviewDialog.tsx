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
        <DialogHeader className="gap-3 text-center sm:text-center">
          <DialogTitle className="text-xl font-bold text-[#2e211c]">
            리뷰 작성을 건너뛸까요?
          </DialogTitle>
          <DialogDescription className="text-[15px] leading-[22px] text-[#665a55]">
            당신의 취향을 정확히 반영할 수 없어서 기능이 제한됩니다.
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
            건너뛰기
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
