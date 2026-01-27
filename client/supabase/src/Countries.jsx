import { useState, useEffect } from 'react';
import { supabase } from './utils/supabase/client';

export default function Countries() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase
      .from('countries')
      .select()
      .order('name', { ascending: true });

    setCountries(data);
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}
