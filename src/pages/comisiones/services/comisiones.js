class ComisionesService {
  async get({ start_date, end_date }) {
    return await fetch("http://localhost:5000/api/comisiones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        desde: start_date,
        hasta: end_date,
      }),
    }).then((resp) => resp.json());
  }
}

export const service = new ComisionesService();
