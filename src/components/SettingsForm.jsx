import { useEffect, useState } from 'react'
import './SettingsForm.css'

const STORAGE_KEY = 'flyrank-settings'

const defaultSettings = {
  displayName: '',
  email: '',
  websiteUrl: '',
  primaryKeyword: '',
  checkInterval: 'weekly',
  emailAlerts: true,
  theme: 'system',
}

function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultSettings
    return { ...defaultSettings, ...JSON.parse(stored) }
  } catch {
    return defaultSettings
  }
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme === 'system' ? '' : theme
}

export function SettingsForm() {
  const [settings, setSettings] = useState(loadSettings)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    applyTheme(settings.theme)
  }, [settings.theme])

  function updateField(field, value) {
    setSettings((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    saveSettings(settings)
    applyTheme(settings.theme)
    setSaved(true)
  }

  function handleReset() {
    setSettings(defaultSettings)
    saveSettings(defaultSettings)
    applyTheme(defaultSettings.theme)
    setSaved(true)
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <fieldset className="settings-fieldset">
        <legend>Profile</legend>

        <label className="settings-label" htmlFor="displayName">
          Display name
        </label>
        <input
          id="displayName"
          className="settings-input"
          type="text"
          value={settings.displayName}
          onChange={(e) => updateField('displayName', e.target.value)}
          placeholder="Your name"
          autoComplete="name"
        />

        <label className="settings-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="settings-input"
          type="email"
          value={settings.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </fieldset>

      <fieldset className="settings-fieldset">
        <legend>Tracking</legend>

        <label className="settings-label" htmlFor="websiteUrl">
          Website URL
        </label>
        <input
          id="websiteUrl"
          className="settings-input"
          type="url"
          value={settings.websiteUrl}
          onChange={(e) => updateField('websiteUrl', e.target.value)}
          placeholder="https://example.com"
        />

        <label className="settings-label" htmlFor="primaryKeyword">
          Primary keyword
        </label>
        <input
          id="primaryKeyword"
          className="settings-input"
          type="text"
          value={settings.primaryKeyword}
          onChange={(e) => updateField('primaryKeyword', e.target.value)}
          placeholder="best coffee shop"
        />

        <label className="settings-label" htmlFor="checkInterval">
          Rank check interval
        </label>
        <select
          id="checkInterval"
          className="settings-input"
          value={settings.checkInterval}
          onChange={(e) => updateField('checkInterval', e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </fieldset>

      <fieldset className="settings-fieldset">
        <legend>Preferences</legend>

        <label className="settings-label" htmlFor="theme">
          Theme
        </label>
        <select
          id="theme"
          className="settings-input"
          value={settings.theme}
          onChange={(e) => updateField('theme', e.target.value)}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <label className="settings-checkbox">
          <input
            type="checkbox"
            checked={settings.emailAlerts}
            onChange={(e) => updateField('emailAlerts', e.target.checked)}
          />
          Send email alerts when rankings change
        </label>
      </fieldset>

      <div className="settings-actions">
        <button type="submit" className="settings-button settings-button--primary">
          Save settings
        </button>
        <button
          type="button"
          className="settings-button settings-button--secondary"
          onClick={handleReset}
        >
          Reset to defaults
        </button>
      </div>

      {saved && (
        <p className="settings-feedback" role="status">
          Settings saved.
        </p>
      )}
    </form>
  )
}
