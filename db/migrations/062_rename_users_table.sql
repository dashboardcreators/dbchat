DO $$
BEGIN
  IF to_regclass('coexistence.forgecrm_users') IS NOT NULL
     AND to_regclass('coexistence.dbchat_users') IS NULL THEN
    ALTER TABLE coexistence.forgecrm_users RENAME TO dbchat_users;
  END IF;
END $$;
