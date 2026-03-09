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
                  isCompleted && 'bg-warm-900 text-white',
                  isActive && 'bg-blush-50 border-2 border-blush-400 text-blush-600',
                  !isCompleted && !isActive && 'bg-cream-200 text-warm-400'
                )}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              <span
                className={cn(
                  'text-xs hidden sm:block',
                  isActive ? 'text-blush-500' : 'text-warm-400'
                )}
              >
                {STEP_LABELS[step]}
              </span>
            </div>
            {index < ONBOARDING_STEPS.length - 1 && (
              <div
                className={cn(
                  'h-0.5 w-8 sm:w-12 mb-4 transition-all duration-500',
                  isCompleted ? 'bg-warm-800' : 'bg-cream-200'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}