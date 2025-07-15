export default async function ping(req, res) {
  const renderUrl = 'https://ep-websocket-server.onrender.com/ping';

  res.setHeader('Access-Control-Allow-Origin', renderUrl);
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // No content
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const ping = await fetch(renderUrl, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!ping.ok) {
      return res.status(500).json({ error: 'Render ping failed' });
    }

    res.status(200).json({ message: 'Pinged Render successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Ping error', detail: err.message });
  }
}
