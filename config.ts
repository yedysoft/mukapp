const live = false;

const host: string = live ? '181.215.68.158:8002' : '172.20.10.9:8002';

const prefix = 'http';

export const restUrl = `${prefix}://${host}`;

export const wsUrl = `ws://${host}/ws`;
