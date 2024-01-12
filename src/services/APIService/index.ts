import axios from 'axios';

const API_URL = 'http://localhost:8080/consumption';

export async function fetchData() {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch(error) {
    console.log(error);
  }
}
