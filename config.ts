const live = true;

const host: string = live ? '185.169.180.123:8002' : '10.198.7.186:8002';

const prefix = 'http';

export const restUrl = `${prefix}://${host}`;

export const wsUrl = `ws://${host}/ws`;

export const spotifyOpenUrlBase = 'https://open.spotify.com';
