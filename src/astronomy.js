export default class Astronomy {
  static randomImage(imageNumber) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&count=${imageNumber}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }

  static async getRoverImage(solDays) {
    try {
      const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${solDays}&api_key=${process.env.API_KEY}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      console.log(response);
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}
