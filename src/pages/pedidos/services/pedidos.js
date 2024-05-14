export class PedidosServices {
  products = async () => {
    return await fetch("http://localhost:5000/api/producto/getproducts").then(
      (resp) => resp.json(),
    );
  };

  sellers = async () => {
    return await fetch("http://localhost:5000/api/vendedores/getAll").then(
      (resp) => resp.json(),
    );
  };

  customers = async () => {
    return await fetch("http://localhost:5000/api/clientes/getAll").then(
      (resp) => resp.json(),
    );
  };
}

export const service = new PedidosServices();
