import http from "./http";

let countries = [];
let jobCategories = [];

export const getCountries = async () => {
  if (!countries.length) {
    const res = await http.get("/api/v1/countries");
    countries = res.data.data.map((country) => ({
      _id: country._id,
      name: country.translations.fa,
    }));
  }
  return countries;
};

export const getCities = async (countryId) => {
  const res = await http.get(`/api/v1/countries/${countryId}/cities`);
  return res.data.data.map((city) => ({ _id: city._id, name: city.cityName }));
};

export const getJobCategories = async (countryId) => {
  if (!jobCategories.length) {
    const res = await http.get("/api/v1/jobcategories");
    jobCategories = res.data.data.map((category) => ({
      _id: category._id,
      name: category.name,
    }));
  }
  return jobCategories;
};

export const getOccupations = async (categoryId) => {
  const res = await http.get(`/api/v1/jobcategories/${categoryId}`);
  const occupations = res.data.data.map((category) => ({
    _id: category.occupation_id,
    name: category.occupationAlias,
  }));
  return occupations;
};
