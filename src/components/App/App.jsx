import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { Section, Title } from './App.styles';

import PropTypes from 'prop-types';

export const App = ({ title }) => (
  <Section>
    <Title>{title}</Title>
    <ContactForm />
    <Filter />
    <ContactList />
  </Section>
);

App.propTypes = {
  title: PropTypes.string.isRequired,
};
