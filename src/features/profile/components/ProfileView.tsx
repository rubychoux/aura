import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { useProfileContext } from '@/store/profile/ProfileContext';
import { PROFILE_ACTIONS } from '@/store/profile/profile.actions';
import { formatGoal } from '@/utils/format';

export function ProfileView() {
  const { profile, isProfileComplete, dispatch } = useProfileContext();

  const profileRows = [
    { label: 'Skin Type', value: profile.skinType },
    { label: 'Climate', value: profile.climate },
    { label: 'Sleep', value: profile.sleepHours ? `${profile.sleepHours}h / night` : undefined },
    { label: 'Stress Level', value: profile.stressLevel ? `${profile.stressLevel} / 5` : undefined },
    { label: 'Water Intake', value: profile.waterIntakeLiters ? `${profile.waterIntakeLiters}L / day` : undefined },
    { label: 'Diet', value: profile.dietType },
    { label: 'Workout', value: profile.workoutFrequency !== undefined ? `${profile.workoutFrequency}x / week` : undefined },
    { label: 'Goals', value: profile.goals?.length ? profile.goals.map(formatGoal).join(', ') : undefined },
  ].filter((row) => row.value);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-light text-warm-900">Your Profile</h1>
        <p className="text-warm-400 text-sm mt-1">
          {isProfileComplete
            ? 'Your full profile powers your optimization dashboard and personalized scanner.'
            : 'Complete your profile to unlock your optimization dashboard.'}
        </p>
      </div>

      {/* Profile data */}
      {profileRows.length > 0 ? (
        <Card>
          <p className="text-xs font-medium text-warm-400 uppercase tracking-widest mb-4">
            Saved Profile
          </p>
          <div className="space-y-3">
            {profileRows.map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center py-2 border-b border-cream-100 last:border-0"
              >
                <span className="text-warm-400 text-sm">{label}</span>
                <span className="text-warm-800 text-sm font-medium capitalize">{value}</span>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card>
          <p className="text-sm text-warm-400 text-center py-4">
            No profile data saved yet.
          </p>
        </Card>
      )}

      {/* CTAs */}
      <div className="space-y-3">
        <Link
          to="/profile/setup"
          className="block w-full py-3 bg-warm-900 text-white text-sm font-medium rounded-xl text-center hover:bg-warm-800 transition-colors"
        >
          {isProfileComplete ? 'Update full profile' : 'Set up my full profile'} →
        </Link>

        {profileRows.length > 0 && (
          <button
            onClick={() => dispatch({ type: PROFILE_ACTIONS.RESET })}
            className="block w-full py-3 border border-cream-300 text-warm-400 text-sm rounded-xl text-center hover:text-warm-600 hover:border-cream-400 transition-colors"
          >
            Reset profile data
          </button>
        )}
      </div>

      {/* Deep personalization note */}
      <div className="bg-cream-50 border border-cream-200 rounded-xl p-4">
        <p className="text-xs text-warm-400 leading-relaxed">
          The full 5-step profile unlocks your <strong className="text-warm-600">Optimization Dashboard</strong> — personalized sleep, fitness, and skin scores — plus a custom daily protocol. The scanner works without it, but gets more precise with your skin type saved.
        </p>
      </div>
    </div>
  );
}
