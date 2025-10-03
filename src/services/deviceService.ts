import type { DeviceData } from "./types/deviceService.types";

class deviceService {
  readonly endpoint = 'https://api.qa.myintelli.net/v1/devices'  

  async getDevices(limit: number, offset: number, search: string): Promise<DeviceData> {

    const url = `${this.endpoint}?limit=${limit}&offset=${offset}&search=${search}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('Error al obtener dispositivos');
    }

    const data = await response.json();

    return data.data;
  }
}

export default new deviceService();