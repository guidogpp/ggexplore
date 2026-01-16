-- ============================================
-- SETUP MÍNIMO PARA VALIDAR CONEXIÓN
-- ============================================
-- Ejecuta esto en el SQL Editor de Supabase

-- 1. Crear tabla experiments
CREATE TABLE IF NOT EXISTS experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Desactivar RLS temporalmente (solo para testing)
ALTER TABLE experiments DISABLE ROW LEVEL SECURITY;

-- 3. (ALTERNATIVA) Si quieres mantener RLS activado, usa esto en su lugar:
-- ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
-- 
-- CREATE POLICY "Allow anonymous read access" 
--   ON experiments FOR SELECT 
--   TO anon 
--   USING (true);
-- 
-- CREATE POLICY "Allow anonymous insert" 
--   ON experiments FOR INSERT 
--   TO anon 
--   WITH CHECK (true);

-- 4. Insertar datos de prueba
INSERT INTO experiments (slug, name, status) 
VALUES 
  ('pdp-test', 'Product Detail Page Test', 'active'),
  ('checkout-v2', 'Checkout V2 Experiment', 'draft')
ON CONFLICT (slug) DO NOTHING;

-- 5. Verificar
SELECT * FROM experiments;
