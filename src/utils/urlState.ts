/**
 * URL State Management Utility
 * Encodes and decodes objects to/from Base64 for stateless URL transitions
 */

/**
 * Encodes an object into a Base64 string
 */
export function encodeData(data: any): string {
  try {
    const jsonString = JSON.stringify(data);
    // Use btoa with encodeURIComponent to handle non-ASCII characters
    return btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  } catch (error) {
    console.error("Encoding error:", error);
    return "";
  }
}

/**
 * Decodes a Base64 string back into an object
 */
export function decodeData<T>(encoded: string | null): T | null {
  if (!encoded) return null;
  try {
    // Use atob with decodeURIComponent
    const jsonString = decodeURIComponent(Array.prototype.map.call(atob(encoded), (c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("Decoding error:", error);
    return null;
  }
}

/**
 * Merges current query parameters with new ones, preserving encoded state
 */
export function getStatelessUrl(path: string, currentParams: URLSearchParams, newData: any = {}): string {
  const params = new URLSearchParams(currentParams.toString());

  if (Object.keys(newData).length > 0) {
    const existingData = decodeData<any>(params.get('d')) || {};
    const mergedData = { ...existingData, ...newData };
    params.set('d', encodeData(mergedData));
  }

  const queryString = params.toString();
  return `${path}${queryString ? '?' + queryString : ''}`;
}
