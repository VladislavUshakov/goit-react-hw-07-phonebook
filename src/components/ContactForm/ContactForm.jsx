import { Form, ErrorMessage, LabelText, Button } from './ContactForm.styles';
import { Formik, Field } from 'formik';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { getContacts } from '../../redux/selectors';
import * as yup from 'yup';
import 'yup-phone';

export const ContactForm = () => {
  const initialValues = { name: '', number: '' };
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      )
      .required(),
    number: yup.string().phone('UA').required(),
  });

  const dispatch = useDispatch();
  const currentContacts = useSelector(getContacts);

  const formHandler = (newContact, { resetForm }) => {
    const isNewContact = !currentContacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (!isNewContact) {
      Report.failure(`${newContact.name} is already in contacts`, '', 'Okey', {
        position: 'center-bottom',
      });
      return;
    }

    dispatch(addContact(newContact));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={formHandler}
    >
      <Form>
        <label>
          <LabelText>Name</LabelText>
          <Field name="name" placeholder="Name Surname" />
          <ErrorMessage component="p" name="name" />
        </label>
        <label>
          <LabelText>Number</LabelText>
          <Field type="tel" name="number" placeholder="380 98 000 0000" />
          <ErrorMessage component="p" name="number" />
        </label>
        <Button type="submit">Add contact</Button>
      </Form>
    </Formik>
  );
};
