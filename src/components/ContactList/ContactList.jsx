import { ContactItem } from 'components/ContactItem';
import PropTypes from 'prop-types';
import { List, Title } from './ContactList.styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/filter/filterSelectors';
import { selectContacts } from 'redux/contacts/contactsSelectors';
import { fetchContacts } from 'redux/contacts/contactsOperations';

export const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contacts = useSelector(selectContacts);
  const filter = useSelector(getFilter).toLowerCase();
  const filteredContacts = contacts.filter(contact => {
    const lowerName = contact.name.toLowerCase();
    return lowerName.includes(filter);
  });
  const isContacts = filteredContacts.length > 0;

  return (
    <div>
      <Title>Contacts</Title>
      {isContacts ? (
        <List>
          {filteredContacts.map(({ name, number, id }) => {
            return <ContactItem key={id} name={name} number={number} id={id} />;
          })}
        </List>
      ) : (
        <p>No contacts</p>
      )}
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
