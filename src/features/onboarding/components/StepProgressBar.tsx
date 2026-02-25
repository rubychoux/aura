import { cn } from '@/utils/cn';
import { ONBOARDING_STEPS, type OnboardingStepId } from '@/utils/constants';

interface Props {
  currentStep: OnboardingStepId;
  currentStepIndex: number;
}

const STEP_LABELS: Record<OnboardingStepId, string> = {
  skin: 'Skin',
  lifestyle: 'Lifestyle',
  fitness: 'Fitness',
  goals: 'Goals',
  review: 'Review',
};

export function StepProgressBar({ currentStep, currentStepIndex }: Props) {
  return (
    <div className="flex items-center gap-2">
      {ONBOARDING_STEPS.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isActive = step === currentStep;

        return (
          <div key={step} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                  isCompleted && 'bg-violet-600 text-white',
                  isActive && 'bg-violet-500/20 border-2 border-violet-500 text-violet-300',
                  !isCompleted && !isActive && 'bg-zinc-800 text-zinc-600'
                )}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              <span
                className={cn(
                  'text-xs hidden sm:block',
                  isActive ? 'text-violet-300' : 'text-zinc-600'
                )}
              >
                {STEP_LABELS[step]}
              </span>
            </div>
            {index < ONBOARDING_STEPS.length - 1 && (
              <div
                className={cn(
                  'h-0.5 w-8 sm:w-12 mb-4 transition-all duration-500',
                  isCompleted ? 'bg-violet-600' : 'bg-zinc-800'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}