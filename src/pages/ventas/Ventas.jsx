import { Formik } from "formik";
import { InitialValue, Schema } from "./schema";
import { useState } from "react";
import { service } from "./services/ventas";

export const Ventas = () => {
  const [ventas, setVentas] = useState([]);

  const query = async ({ start_date, end_date }) => {
    const { data, statusCode } = await service.get({ start_date, end_date });
    if (statusCode === 200) {
      setVentas(data);
    }
  };

  const submit = (values) => {
    query(values);
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-3xl">Ventas por Departamento</h1>
      <Formik
        initialValues={InitialValue}
        onSubmit={submit}
        validationSchema={Schema}
      >
        {(formik) => (
          <form
            className="grid grid-cols-2 gap-2"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label
                for="start_date"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Fecha inicial
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                onChange={formik.handleChange}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="dd/mm/yyyy"
                value={formik.values.start_date}
                required
              />
            </div>
            <div>
              <label
                for="end_date"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Fecha final
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                onChange={formik.handleChange}
                value={formik.values.end_date}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="John"
                required
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={!formik.isValid}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Consultar
              </button>
            </div>
          </form>
        )}
      </Formik>
      <div class="relative overflow-x-auto rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-800 uppercase bg-gray-200">
            <tr>
              <th scope="col" class="px-6 py-3">
                Codigo departamento
              </th>
              <th scope="col" class="px-6 py-3">
                Nombre
              </th>
              <th scope="col" class="px-6 py-3">
                SubTotal
              </th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((item) => (
              <tr class="odd:bg-white even:bg-gray-50 border-b text-gray-900">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.codigoDepartamento}
                </th>
                <td class="px-6 py-4">{item.nombreDepartamento}</td>
                <td class="px-6 py-4">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    maximumFractionDigits: 0,
                  }).format(item.subtotal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
