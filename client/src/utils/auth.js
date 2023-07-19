import decode from "jwt-decode";

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return decode(token);
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      if (!token) return true;
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      console.log("expired check failed! Line 42: AuthService.js");
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    if (!idToken) {
      return false;
    }
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
