import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

import { LANGUAGES } from "../../constants";
import Select from "../../system/Select";
import FormControl from "../../system/FormControl";

function LanguageForm() {
  const language = window.localStorage.i18nextLng;
  const initialValues = {
    language: LANGUAGES.find((item) => item.value === language),
  };
  const formik = useFormik({
    initialValues,
  });
  const { i18n, t } = useTranslation();

  function onChange(value) {
    formik.setFieldValue("language", value);
    i18n.changeLanguage(value.value);
  }

  return (
    <FormControl label={t("Language")}>
      <Select
        value={formik.values.language}
        options={LANGUAGES}
        onChange={onChange}
      />
    </FormControl>
  );
}

export default LanguageForm;
