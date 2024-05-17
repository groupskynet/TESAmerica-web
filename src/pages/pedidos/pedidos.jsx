import { Formik } from "formik";
import { useEffect } from "react";
import Select from "react-select";
import { useState } from "react";
import NiceModal from "@ebay/nice-modal-react";

import Modal from './components/modal';
import { service } from "./services/pedidos";
import { InitialValues, Schema } from "./Schema";

export const Pedidos = () => {

  const [customers, setCustomers] = useState([]);
  const [sellers, setSellers] = useState([]);

  const [message, setMessage] = useState('');


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
    getCustomers();
    getSellers();
  }, []);

  const add = (formik) => {
    NiceModal.show(Modal).then(resp => {
      formik.setFieldValue('productosPedido',
        [...formik.values.productosPedido, { producto: resp.producto, cantidad: resp.cantidad }]
      )
    });
  }

  const handleSubmit = async (values, { resetForm }) => {
    const data = { ...values, productosPedido: values.productosPedido.map(item => ({ codPro: item.producto.value, cantidad: item.cantidad })) }
    const resp = await service.pedido(data);
    resetForm(InitialValues);
    setMessage(resp.mensaje);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <>
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl">Nuevo Pedido</h1>
        {message && <div className="p-2 bg-blue-500 text-white font-medium">
          {message} </div>}
        <div className="flex-grow">
          <Formik initialValues={InitialValues} validationSchema={Schema} onSubmit={handleSubmit}>
            {(formik) => (
              <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
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
                <div className="flex justify-end">
                  <button type="button" onClick={() => add(formik)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Agregar
                  </button>
                </div>
                <div className="relative overflow-x-auto rounded-lg flex-grow">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-200">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Producto
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Cantidad
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {formik.values.productosPedido.map(item => (
                        <tr key={item.producto.value}>
                          <td>{item.producto.label}</td>
                          <td>{item.cantidad}</td>
                          <td>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500 text-center">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
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
