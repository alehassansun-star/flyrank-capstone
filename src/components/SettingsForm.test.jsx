import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SettingsForm } from './SettingsForm'

describe('SettingsForm', () => {
  it('submits valid form data', async () => {
    const user = userEvent.setup()
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/display name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.click(screen.getByLabelText(/notifications enabled/i))

    const submitButton = screen.getByRole('button', { name: /save settings/i })
    await waitFor(() => expect(submitButton).toBeEnabled())

    await user.click(submitButton)

    expect(consoleSpy).toHaveBeenCalledWith({
      displayName: 'Jane Doe',
      email: 'jane@example.com',
      notificationsEnabled: true,
    })

    consoleSpy.mockRestore()
  })

  it('shows an error when a required field is missing', async () => {
    const user = userEvent.setup()

    render(<SettingsForm />)

    await user.click(screen.getByLabelText(/display name/i))
    await user.tab()

    expect(await screen.findByText(/display name must be at least 2 characters/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save settings/i })).toBeDisabled()
  })

  it('shows an error for an invalid email format', async () => {
    const user = userEvent.setup()

    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/display name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email/i), 'not-an-email')
    await user.tab()

    expect(await screen.findByText(/enter a valid email address/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save settings/i })).toBeDisabled()
  })
})
