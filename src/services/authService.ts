
class AuthService {
  readonly endpoint = 'https://api.qa.myintelli.net/v1/login'

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      
      if (!response.ok) {
        throw new Error('Error al iniciar sesión', { cause: response.statusText });
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthService();