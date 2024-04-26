
import axios from 'axios'
import { useEffect } from 'react'
import useLocalStorage from "use-local-storage";
import { CountryFlagsTemplate } from '../templates/CountryFlagsTemplate';


export default function CountryFlagsComponent() {
    const [countryCode, setCountryCode] = useLocalStorage<String | null>("countryCode", null);
    let countryCodeString = countryCode ? countryCode : "SN";

    useEffect(() => {
        if (countryCode === null) {
            getGeoInfo();
        }
    }, [countryCode])
    const getGeoInfo = () => {
        axios.get('https://ipapi.co/json/').then((response) => {
            let data = response.data;
            setCountryCode(data.country_code);
        }).catch((error) => {
            console.log(error);
        });
    }
  return <CountryFlagsTemplate countryCode={countryCodeString as string}  />
}
