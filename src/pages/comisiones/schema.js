import * as Yup from "yup";

export const InitialValue = {
  start_date: "",
  end_date: "",
};

export const Schema = Yup.object().shape({
  start_date: Yup.date(),
  end_date: Yup.date().when("start_date", (start_date, schema) => {
    return schema.min(start_date, "End date must be later than start date");
  }),
});
