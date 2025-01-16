/*
  # Nettoyage complet des données

  1. Suppression des données
    - Supprime toutes les données de toutes les tables
    - Préserve la structure des tables et les politiques RLS
  
  2. Notes
    - Cette migration est irréversible
    - Les données seront complètement effacées
    - La structure de la base de données reste intacte
*/

-- Désactiver temporairement les contraintes de clés étrangères
DO $$ BEGIN
  EXECUTE (
    SELECT 'ALTER TABLE ' || quote_ident(table_schema) || '.' || quote_ident(table_name) || ' DISABLE TRIGGER ALL;'
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
  );
END $$;

-- Supprimer les données de toutes les tables
DO $$ 
DECLARE
  r RECORD;
BEGIN
  FOR r IN (
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename != 'schema_migrations'
  ) LOOP
    EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE;';
  END LOOP;
END $$;

-- Réactiver les contraintes de clés étrangères
DO $$ BEGIN
  EXECUTE (
    SELECT 'ALTER TABLE ' || quote_ident(table_schema) || '.' || quote_ident(table_name) || ' ENABLE TRIGGER ALL;'
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
  );
END $$;