export interface Ranks {
  id: number;
  name: string;
  score: number;
}

export interface Ships {
  id: number;
  name: string;
}

export interface Player {
  name: string;
  credit: number;
  vitality: number;
}

export interface Characters {
  id: number;
  name: string;
  credit: number;
  experience: number;
  ship: {
      id: number;
      name: string;
      vitality: number;
  }
}
  
export default class gameService {
  static async fetchRankings() {
    const response = await fetch("http://127.0.0.1:3000/ranking");
    return await response.json();
  }
  
  static async fetchShips() {
    const response = await fetch("http://127.0.0.1:3000/ships");
    return response.json();
  }
  
  static async fetchCharacters() {
    const response = await fetch("http://127.0.0.1:3000/characters?_page=1&_limit=100");
    return response.json();
  }

  static async fetchSingleCharacter(characterId: number){
    const response = await fetch(`http://127.0.0.1:3000/characters/${characterId}`);
    return response.json();
  }

  static async addRanking(ranking: Ranks) {
    const response = await fetch("http://127.0.0.1:3000/ranking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ranking)
    });
    return await response.json();
  }
  
}
