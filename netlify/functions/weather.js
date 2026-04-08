exports.handler = async function (event) {
  const city = event.queryStringParameters.city;
  const lat = event.queryStringParameters.lat;
  const lon = event.queryStringParameters.lon;

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing OPENWEATHER_API_KEY' })
    };
  }

  let apiUrl = '';

  if (city) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;
  } else if (lat && lon) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(
      lat
    )}&lon=${encodeURIComponent(lon)}&appid=${apiKey}&units=metric`;
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing city or coordinates' })
    };
  }

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
      body: JSON.stringify({ error: 'Weather lookup failed' })
    };
  }
};
