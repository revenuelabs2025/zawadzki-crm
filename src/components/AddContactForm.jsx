import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AddContactForm = () => {
  const [contactTypes, setContactTypes] = useState([]);
  const [voivodeships, setVoivodeships] = useState([]);
  const [acquisitionSources, setAcquisitionSources] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    let active = true;

    const fetchOptions = async () => {
      try {
        const [contactTypeRes, voivodeshipRes, acquisitionRes, profileRes] =
          await Promise.all([
            supabase.from('contact_types').select('id, name').order('name'),
            supabase.from('voivodeships').select('id, name').order('name'),
            supabase.from('acquisition_sources').select('id, name').order('name'),
            supabase.from('profiles').select('id, name').order('name'),
          ]);

        if (contactTypeRes.error) throw contactTypeRes.error;
        if (voivodeshipRes.error) throw voivodeshipRes.error;
        if (acquisitionRes.error) throw acquisitionRes.error;
        if (profileRes.error) throw profileRes.error;

        if (active) {
          setContactTypes(contactTypeRes.data || []);
          setVoivodeships(voivodeshipRes.data || []);
          setAcquisitionSources(acquisitionRes.data || []);
          setProfiles(profileRes.data || []);
        }
      } catch (err) {
        console.error('Błąd pobierania danych formularza:', err);
      }
    };

    fetchOptions();
    return () => {
      active = false;
    };
  }, []);

  return (
    <form>
      <select name="contact_type" defaultValue="">
        <option value="" disabled>
          {contactTypes.length ? 'Wybierz typ kontaktu' : 'Ładowanie...'}
        </option>
        {contactTypes.map((ct) => (
          <option key={ct.id} value={ct.id}>
            {ct.name}
          </option>
        ))}
      </select>

      <select name="voivodeship" defaultValue="">
        <option value="" disabled>
          {voivodeships.length ? 'Wybierz województwo' : 'Ładowanie...'}
        </option>
        {voivodeships.map((v) => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>

      <select name="acquisition_source" defaultValue="">
        <option value="" disabled>
          {acquisitionSources.length ? 'Wybierz źródło pozyskania' : 'Ładowanie...'}
        </option>
        {acquisitionSources.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>

      <select name="owner" defaultValue="">
        <option value="" disabled>
          {profiles.length ? 'Wybierz właściciela' : 'Ładowanie...'}
        </option>
        {profiles.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </form>
  );
};

export default AddContactForm;
