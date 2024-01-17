const API_URL = 'http://localhost:8080/consumption';

export async function fetchData() {
  try {
    const data = await fetch(API_URL, {
      cache: 'force-cache',
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => response.json());
    return data;
  } catch(error) {
    console.log(error);
  }
}
