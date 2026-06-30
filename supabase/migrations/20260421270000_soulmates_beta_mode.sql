-- Add soulmates beta mode setting
INSERT INTO app_settings (setting_key, setting_value)
VALUES ('soulmates_beta_mode', 'true')
ON CONFLICT (setting_key) DO NOTHING;
