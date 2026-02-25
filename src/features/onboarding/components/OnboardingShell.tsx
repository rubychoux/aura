import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../hooks/useOnboarding';
import { StepProgressBar } from './StepProgressBar';
import { SkinStep } from './steps/SkinStep';
import { LifestyleStep } from './steps/LifestyleStep';
import { FitnessStep } from './steps/FitnessStep';
import { GoalsStep } from './steps/GoalsStep';
import { Button } from '@/components/ui/Button';
import { PROFILE_ACTIONS } from '@/store/profile/profile.actions';
import { useProfileContext } from '@/store/profile/ProfileContext';
import { formatGoal } from '@/utils/format';
import { v4 as uuidv4 } from 'uuid';

export function OnboardingShell() {
  const navigate = useNavigate();
  const { dispatch } = useProfileContext();
  const {
    currentStep,
    currentStepIndex,
    goNext,
    goPrev,
    updateProfile,
    canGoNext,
    profile,
  } = useOnboarding();

  const handleFinish = () => {
    dispatch({
      type: PROFILE_ACTIONS.UPDATE_FIELD,
      payload: {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
    navigate('/dashboard');
  };

  const STEP_TITLES: Record<string, { title: string; subtitle: string }> = {
    skin: {
      title: 'Skin Profile',
      subtitle: 'Your skin type and climate determine your baseline protocol.',
    },
    lifestyle: {
      title: 'Lifestyle Data',
      subtitle: 'Sleep, stress, and hydration are the highest-leverage variables.',
    },
    fitness: {
      title: 'Fitness Frequency',
      subtitle: 'Training volume shapes your recovery and optimization capacity.',
    },
    goals: {
      title: 'Optimization Goals',
      subtitle: 'Your protocol will be weighted toward these outcomes.',
    },
    review: {
      title: 'Review & Generate',
      subtitle: 'Confirm your inputs before we generate your protocol.',
    },
  };

  const stepInfo = STEP_TITLES[currentStep];

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-black">A</span>
          </div>
          <span className="text-white font-bold tracking-wide">AURA</span>
        </div>
        <StepProgressBar
          currentStep={currentStep}
          currentStepIndex={currentStepIndex}
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">{stepInfo.title}</h2>
          <p className="text-zinc-400 text-sm mt-1">{stepInfo.subtitle}</p>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {currentStep === 'skin' && (
            <SkinStep
              skinType={profile.skinType}
              climate={profile.climate}
              onChange={updateProfile}
            />
          )}
          {currentStep === 'lifestyle' && (
            <LifestyleStep
              sleepHours={profile.sleepHours}
              stressLevel={profile.stressLevel}
              waterIntakeLiters={profile.waterIntakeLiters}
              dietType={profile.dietType}
              onChange={updateProfile}
            />
          )}
          {currentStep === 'fitness' && (
            <FitnessStep
              workoutFrequency={profile.workoutFrequency}
              onChange={updateProfile}
            />
          )}
          {currentStep === 'goals' && (
            <GoalsStep
              goals={profile.goals}
              onChange={updateProfile}
            />
          )}
          {currentStep === 'review' && (
            <div className="space-y-3">
              {[
                { label: 'Skin Type', value: profile.skinType },
                { label: 'Climate', value: profile.climate },
                { label: 'Sleep', value: `${profile.sleepHours}h / night` },
                { label: 'Stress Level', value: `${profile.stressLevel} / 5` },
                { label: 'Water Intake', value: `${profile.waterIntakeLiters}L / day` },
                { label: 'Diet', value: profile.dietType },
                { label: 'Workout Frequency', value: `${profile.workoutFrequency}x / week` },
                { label: 'Goals', value: profile.goals?.map(formatGoal).join(', ') },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-2 border-b border-zinc-800"
                >
                  <span className="text-zinc-400 text-sm">{label}</span>
                  <span className="text-zinc-100 text-sm font-medium capitalize">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={goPrev}
            disabled={currentStepIndex === 0}
          >
            ← Back
          </Button>

          {currentStep === 'review' ? (
            <Button onClick={handleFinish} size="lg">
              Generate My Protocol →
            </Button>
          ) : (
            <Button onClick={goNext} disabled={!canGoNext}>
              Continue →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}