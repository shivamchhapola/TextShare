import { Redis } from 'ioredis';

export default async function handler(req, res) {
  const client = new Redis(process.env.UPSTASH_REDIS);

  if (req.method === 'GET') {
    return res.status(200).send(await client.get(req.query.id));
  } else if (req.method === 'POST') {
    const id = await client.incr('id');
    await client.set(id, req.body);
    return res.status(200).json({ id });
  } else {
    return res.status(200).send('UwU I dunno what to do with dat OwO');
  }
}
