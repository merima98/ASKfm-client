import React from "react";
import ReactSelect from "react-select";
import { components } from "react-select";

import { ChevronDown } from "react-feather";
import { useDarkMode } from "../state";

function Select(props) {
  const isDarkMode = useDarkMode((state) => state.isDarkMode);
  const { onChange, options } = props;

  function getColors() {
    return {
      color: isDarkMode ? "#FFFFFF" : "#050505",
      borderColor: isDarkMode ? "#12415c" : "#0095f6",
      backgroundColor: isDarkMode ? "#001321" : "#fff",
    };
  }

  function getFont() {
    return {
      fontFamily: "'Roboto', sans-serif",
      fontSize: "0.5rem",
    };
  }

  const styles = {
    control: (base, state) => ({
      ...base,
      minHeight: "36px",
      boxShadow: "none",
      borderRadius: "4px",
      ...getColors(),
      "&:hover": {
        backgroundColor: isDarkMode ? "#021d2e" : "#f0f2f5",
      },
    }),
    singleValue: () => ({
      ...getFont(),
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#001321" : "#fff",
    }),

    option: (base) => ({
      ...base,
      ...getFont(),
      backgroundColor: isDarkMode ? "#001321" : "#fff",
      color: isDarkMode ? "#FFFFFF" : "#050505",
      "&:hover": {
        backgroundColor: isDarkMode ? "#021d2e" : "#f0f2f5",
      },
    }),
  };

  function DropdownIndicator(props) {
    return (
      <components.DropdownIndicator {...props}>
        <ChevronDown size={12} />
      </components.DropdownIndicator>
    );
  }

  return (
    <ReactSelect
      {...props}
      onChange={onChange}
      options={options}
      styles={styles}
      components={{ DropdownIndicator }}
    />
  );
}

export default Select;
