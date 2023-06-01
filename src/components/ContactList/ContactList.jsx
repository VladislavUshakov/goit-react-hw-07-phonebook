import { ContactItem } from 'components/ContactItem';
import PropTypes from 'prop-types';
import { List, Title } from './ContactList.styles';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from '../../redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
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
