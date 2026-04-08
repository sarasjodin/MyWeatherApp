exports.handler = async function (event) {
  const lat = event.queryStringParameters.lat;
  const lon = event.queryStringParameters.lon;

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing OPENWEATHER_API_KEY' })
    };
  }

  if (!lat || !lon) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing coordinates' })
    };
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${encodeURIComponent(
    lat
  )}&lon=${encodeURIComponent(lon)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Forecast lookup failed' })
    };
  }
};
