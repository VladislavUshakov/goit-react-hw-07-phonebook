import PropTypes from 'prop-types';
import { DeleteBtn, Item, Name } from './ContactItem.styles';
import { useDispatch } from 'react-redux';
import { removeContact } from 'redux/contacts/contactsOperations';

export const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const deleteBtnHandler = () => dispatch(removeContact(id));

  return (
    <Item>
      <p>
        <Name>{name}:</Name>
        <a href={`tel:${number}`}>{number}</a>
      </p>
      <DeleteBtn type="button" onClick={deleteBtnHandler}>
        Delete
      </DeleteBtn>
    </Item>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
