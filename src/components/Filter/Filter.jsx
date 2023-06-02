import { Title } from 'components/ContactList';
import { FilterSection } from './Filter.stylex';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/filter/filterSelectors';
import { setFilter } from 'redux/filter/filterSlice';

export const Filter = () => {
  const currentFilterValue = useSelector(getFilter);
  const dispatch = useDispatch();

  const inputHandler = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <FilterSection>
      <Title>Find contacts by name</Title>
      <input onChange={inputHandler} value={currentFilterValue} name="filter" />
    </FilterSection>
  );
};
