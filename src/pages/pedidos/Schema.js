import * as Yup from "yup";

export const InitialValues = {
  codCli: "",
  codVend: "",
  productosPedido: [],
};

export const Schema = Yup.object().shape({
  codCli: Yup.string().required("field required"),
  codVend: Yup.string().required("field required"),
  productosPedido: Yup.array()
    .of(
      Yup.object().shape({
        producto: Yup.object().shape({
          label: Yup.string(),
          value: Yup.string().required(),
        }).required("field required"),
        cantidad: Yup.number().min(1, "min 0"),
      }),
    )
    .min(1, "min a item"),
});
