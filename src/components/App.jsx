import { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import styles from './App.module.css';

export const App = () => {
  const contactsLocalStor = JSON.parse(localStorage.getItem('contacts')) ?? [];

  const [contacts, setContacts] = useState(contactsLocalStor);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const saveContact = newContact => {
    const { name } = newContact;
    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts`)
      : setContacts(prev => [newContact, ...prev]);
  };

  const handlerFilter = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const getFilterChange = () => {
    const filterNormalize = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterNormalize)
    );
  };

  const handlerDelete = idContsct => {
    setContacts(prev => prev.filter(({ id }) => id !== idContsct));
  };

  return (
    <div>
      <h2 className={styles.title}>Phonebook</h2>
      <ContactForm addContact={saveContact} />
      <h2 className={styles.title}>Contacts</h2>
      {contacts.length !== 0 && (
        <Filter filter={filter} onChangeFilter={handlerFilter} />
      )}
      <ContactList
        onDelete={handlerDelete}
        filterContacts={getFilterChange()}
      />
    </div>
  );
};
