/**
 * URL base de Supabase Storage (DONAMED BUCKET)
 * Formato: https://<project>.supabase.co/storage/v1/object/public/DONAMED%20BUCKET
 */
const STORAGE_BASE = import.meta.env.VITE_SUPABASE_STORAGE_URL || '';

function isRelativePath(path: string | null | undefined): boolean {
  if (!path) return false;
  // No transformar URLs completas ni blob URLs (preview de archivo local)
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:')) {
    return false;
  }
  return true;
}

/**
 * Convierte una ruta relativa de storage a URL pública completa.
 * Si ya es una URL completa, la devuelve tal cual.
 * @param path - Ruta relativa (ej: MEDICAMENTOS/med_xxx.jpg) o URL completa
 */
export function getStoragePublicUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (!isRelativePath(path)) return path;

  if (!STORAGE_BASE) return path;

  const base = STORAGE_BASE.endsWith('/') ? STORAGE_BASE.slice(0, -1) : STORAGE_BASE;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}/${cleanPath}`;
}
