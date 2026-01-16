# ⚠️ Seguridad y buenas prácticas

- Nunca subas claves reales ni tokens privados a ningún repo, README ni documentación compartida.
- Usa solo valores de ejemplo o ficticios en la documentación.
- Si necesitas compartir el proyecto, cambia las claves antes de hacerlo y elimina cualquier valor real de los archivos públicos.

---

# GGexplore – Setup y Diagnóstico

## Project URL oficial de Supabase

- Ejemplo: `https://<project-ref>.supabase.co`
- ⚠️ ¡Verifica que el Project URL sea exactamente igual al de tu dashboard de Supabase! Si cambia 1 carácter (ej. `eeuaz` vs `uuaz`), tendrás error ENOTFOUND.

## Variables de entorno requeridas en Vercel

Configura en Vercel (Project Settings > Environment Variables):

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (clave pública de ejemplo)
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_ANON_KEY=eyJ... (clave pública de ejemplo)
DEBUG_TOKEN=pon-un-token-seguro-aqui
```

- **Nunca subas claves reales a ningún repo ni README.**
- Usa solo valores de ejemplo o ficticios.

## Checklist de verificación post-deploy

- `/api/diag-env` → `{ hasUrl: true, hasKey: true }`
- `/api/diag-supabase` → `{ ok: true, rows: >0 }`
- `/explore` carga cards
- `/explore/experiments-admin` carga y permite crear

## Seguridad de endpoints de diagnóstico

- Los endpoints `/api/diag-env` y `/api/diag-supabase` deben estar protegidos:
  - Requieren header `x-debug-token` o query `?token=...`
  - El token se define en la env var `DEBUG_TOKEN`
  - Si no coincide, devuelven 404 o 401
- Si no se comparten los links, dejar comentario `// BORRAR antes de demo externa` en esos endpoints.

## Notas

- No modificar lógica, UI, ni estructura de carpetas para estabilizar la POC.
- No tocar RLS ni schema.
- No exponer datos sensibles en ningún archivo compartido.
