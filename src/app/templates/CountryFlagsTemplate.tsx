import ReactCountryFlag from "react-country-flag";
import { CountryFlagProps } from "../../interfaces/interfaces";

export const CountryFlagsTemplate = ({countryCode}: CountryFlagProps) => {

  return (
    <div>
      <ReactCountryFlag countryCode={countryCode} />

      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: "2em",
          height: "2em",
          borderRadius: "20%",
        }}
        title={countryCode}
      />


    </div>
  );
};
