import { Formik } from "formik";
import { useEffect } from "react";
import Select from "react-select";
import { service } from "./services/pedidos";
import { useState } from "react";
import { InitialValues, Schema } from "./Schema";

export const Pedidos = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sellers, setSellers] = useState([]);

  const getProducts = async () => {
    const { data, statusCode } = await service.products();
    if (statusCode === 200) {
      setProducts(
        data.map((item) => ({ value: item.codProd, label: item.nombre })),
      );
    }
  };

  const getCustomers = async () => {
    const { data, statusCode } = await service.customers();
    if (statusCode === 200) {
      setCustomers(
        data.map((item) => ({ value: item.codCli, label: item.nombre })),
      );
    }
  };

  const getSellers = async () => {
    const { data, statusCode } = await service.sellers();
    if (statusCode === 200) {
      setSellers(
        data.map((item) => ({ value: item.codVend, label: item.nombre })),
      );
    }
  };

  useEffect(() => {
    getProducts();
    getCustomers();
    getSellers();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl">Nuevo Pedido</h1>
        <div className="flex-grow">
          <Formik initialValues={InitialValues} validationSchema={Schema}>
            {(formik) => (
              <form className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-medium">Cliente</label>
                    <Select
                      name="codCli"
                      options={customers}
                      value={
                        customers.find(
                          (item) => item.codCli === formik.values.codCli,
                        )?.codCli
                      }
                      onChange={(item) =>
                        formik.setFieldValue("codCli", item.value)
                      }
                    ></Select>
                  </div>
                  <div>
                    <label className="font-medium">Vendedor</label>
                    <Select
                      options={sellers}
                      value={
                        sellers.find(
                          (item) => item.codCli === formik.values.codVend,
                        )?.codVend
                      }
                      onChange={(item) =>
                        formik.setFieldValue("codVend", item.value)
                      }
                    ></Select>
                  </div>
                </div>
                <div className="border-t border-dashed pt-2">
                  <div className="grid grid-cols-3 gap-1 items-center">
                    <div>
                      <label className="block mb-2 text-sm font-medium">
                        Producto
                      </label>
                      <Select options={products}></Select>
                    </div>
                    <div>
                      <label
                        for="end_date"
                        class="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Cantidad
                      </label>
                      <input
                        type="number"
                        id="end_date"
                        name="end_date"
                        onChange={formik.handleChange}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        placeholder="cantidad"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-end justify-end">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
                <div class="relative overflow-x-auto rounded-lg flex-grow">
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-800 uppercase bg-gray-200">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Producto
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Cantidad
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
                <div className="flex justify-end gap-2">
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Guardar
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
