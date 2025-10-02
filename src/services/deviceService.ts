import type { AuthData } from "./types/authService.types";

class AuthService {
  readonly endpoint = 'https://api.qa.myintelli.net/v1/devices'  
  // estructura completa: https://api.qa.myintelli.net/v1/devices?limit=0&offset=0&search=''

  async login(email: string, password: string): Promise<AuthData> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    
    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }

    const data = await response.json();

    const user = {
      email: data.user.email,
      first_name: data.user.first_name,
      last_name: data.user.last_name
    }

    const cleanData = {
      token: data.token,
      user: user,
      modules: data.modules
    }

    return cleanData;
  }
}

export default new AuthService();