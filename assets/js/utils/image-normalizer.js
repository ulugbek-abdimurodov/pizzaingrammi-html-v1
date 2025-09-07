// Image URL Normalizer
// - Appends size params for Google Photos CDN (lh3.googleusercontent.com)
// - Converts common Google Drive links to direct file URLs
// - Leaves other URLs unchanged
// - Returns a placeholder if URL is empty

const DEFAULT_PLACEHOLDER = 'data:image/svg+xml;utf8,\
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">\
  <rect width="100%" height="100%" fill="%23222222"/>\
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23cbc190" font-family="sans-serif" font-size="20">Image unavailable</text>\
</svg>';

export function normalizeImageUrl(rawUrl, options = {}) {
  const width = Number(options.width) || 800;
  const height = Number(options.height) || 600;

  if (!rawUrl) return DEFAULT_PLACEHOLDER;

  const url = String(rawUrl).trim();
  if (!url) return DEFAULT_PLACEHOLDER;

  // Leave local/file/data/blob URLs as-is
  if (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('./') || url.startsWith('/') ) {
    return url;
  }

  // Try to parse
  let parsed;
  try { parsed = new URL(url); } catch { return url; }

  const host = parsed.host || '';

  // Google Photos CDN (best case)
  if (host.endsWith('googleusercontent.com')) {
    // Only append if a size is not already present
    if (/([?&]|=)w\d+/.test(url) || /=s\d+/.test(url)) {
      return url;
    }
    // Append common size directive
    return url + `=w${width}-h${height}-no`;
  }

  // Google Drive link -> convert to direct content URL (no resizing supported)
  if (host.includes('drive.google.com')) {
    // Patterns:
    // - https://drive.google.com/file/d/<ID>/view?usp=sharing
    // - https://drive.google.com/open?id=<ID>
    // - https://drive.google.com/uc?id=<ID>
    const idFromPath = url.match(/\/d\/([^/]+)\//);
    let fileId = idFromPath ? idFromPath[1] : null;
    if (!fileId) {
      fileId = parsed.searchParams.get('id');
    }
    return fileId ? `https://drive.google.com/uc?id=${fileId}` : url;
  }

  // Google Photos share links cannot be converted client-side reliably (CORS)
  // Ask content creators to use "Copy image address" to get an lh3.googleusercontent.com URL
  if (host.includes('photos.app.goo.gl') || host.includes('photos.google.com')) {
    console.warn('[image-normalizer] Google Photos share link detected. Please open the photo and copy the image address (lh3.googleusercontent.com). Returning original link.');
    return url;
  }

  // Other hosts: return as-is
  return url;
}

export { DEFAULT_PLACEHOLDER };
