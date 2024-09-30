const live = false;

const host: string = live ? 'api.yedysoft.com/muk' : '192.168.1.33:8002';

const prefix = live ? 'https' : 'http';

const prefixws = live ? 'wss' : 'ws';

export const restUrl = `${prefix}://${host}`;

export const wsUrl = `${prefixws}://${host}/ws`;

export const spotifyOpenUrlBase = 'https://open.spotify.com';

export const authRedirectUrl = 'muk://login';
