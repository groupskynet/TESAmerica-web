import NiceModal from "@ebay/nice-modal-react";
import { useModal } from "@ebay/nice-modal-react";
import {
  Modal,
  ModalContent,
} from "@nextui-org/modal";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { service } from "../services/pedidos";
import { Formik } from "formik";


export default NiceModal.create(({ }) => {
  const modal = useModal();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const { data, statusCode } = await service.products();
    if (statusCode === 200) {
      setProducts(
        data.map((item) => ({ value: item.codProd, label: item.nombre })),
      );
    }
  };

  const onChange = (key, formik) => {
    const item = products.find(item => item.value  === key);
    formik.setFieldValue('producto', item);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (<Modal isOpen={modal.visible} size="lg" onClose={() => modal.hide()}>
    <ModalContent>
      <Formik 
        initialValues={{ producto: '', cantidad: '' }}
        onSubmit={(values) => {
            modal.resolve(values);
            modal.remove();
        }}
      >
        {(formik) => (
          <form
            className="border-t border-dashed pt-2 p-2"
            onSubmit={formik.handleSubmit}
          >
            <div className="grid grid-cols-2 gap-1 items-center">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Producto
                </label>
                <Autocomplete placeholder="producto" allowsCustomValue={true} onSelectionChange={(key) => onChange(key, formik)}>
                  {products.map((item) => (
                    <AutocompleteItem key={item.value} value={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>
              <div>
                <label
                  htmlFor="cantidad"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Cantidad
                </label>
                <input
                  type="number"
                  id="cantidad"
                  name="cantidad"
                  onChange={formik.handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  placeholder="cantidad"
                  required
                />
              </div>
            </div>
            <div className="flex items-end justify-end pt-2">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Agregar
              </button>
            </div>
          </form>
        )}
      </Formik>

    </ModalContent>
  </Modal>);
});