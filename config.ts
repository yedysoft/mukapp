const live = false;

const host: string = live ? '181.215.68.158:8002' : '10.198.7.186:8002';

export const restUrl = `http://${host}`;

export const wsUrl = `ws://${host}/ws`;
