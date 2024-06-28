export function searchCity(city: string) {
    const cityURI = encodeURIComponent(city);
    return fetch(`https://geo.api.gouv.fr/communes?nom=${cityURI}&fields=nom,codesPostaux&format=json`).then(res => res.json());
}