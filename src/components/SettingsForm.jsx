import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const settingsSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be at most 50 characters'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  notificationsEnabled: z.boolean(),
})

export function SettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    mode: 'all',
    defaultValues: {
      displayName: '',
      email: '',
      notificationsEnabled: false,
    },
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="displayName">Display name</label>
        <input
          id="displayName"
          type="text"
          aria-invalid={errors.displayName ? 'true' : 'false'}
          aria-describedby={errors.displayName ? 'displayName-error' : undefined}
          {...register('displayName')}
        />
        {errors.displayName && (
          <p id="displayName-error" role="alert">
            {errors.displayName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input
          id="notificationsEnabled"
          type="checkbox"
          {...register('notificationsEnabled')}
        />
        <label htmlFor="notificationsEnabled">Notifications enabled</label>
      </div>

      <button type="submit" disabled={!isValid}>
        Save settings
      </button>
    </form>
  )
}
