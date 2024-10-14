const live = false;

const host: string = live ? 'api.yedysoft.com/muk' : 'api.yedysoft.com/muktest';

const prefix = live ? 'https' : 'https';

const prefixws = live ? 'wss' : 'wss';

export const restUrl = `${prefix}://${host}`;

export const wsUrl = `${prefixws}://${host}/ws`;

export const authRedirectUrl = 'https://api.yedysoft.com/muk/auths/login';
