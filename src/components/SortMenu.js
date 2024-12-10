import { useHandleDropdown } from '../hooks';
import { classNames } from '../services';

const sortOptions = [
  { name: 'Customer Rating', sortBy: 'rating', order: 'desc' },
  { name: 'Newly Added', sortBy: 'date', order: 'desc' },
  { name: 'Price: Low to High', sortBy: 'price', order: 'asc' },
  { name: 'Price: High to Low', sortBy: 'price', order: 'desc' },
];

const SortMenu = ({ sort, setSort, sortMenuRef, closeSortMenu }) => {
  useHandleDropdown(sortMenuRef, closeSortMenu);

  const handleSort = option => {
    setSort(option);
    closeSortMenu();
  };

  return (
    <ul className='absolute right-0 top-8 w-44 bg-white shadow-lg ring-1 ring-black/10 rounded py-1 z-20'>
      {sortOptions.map(option => (
        <li
          className={classNames(
            'list-none cursor-pointer px-4 py-2 text-sm hover:bg-gray-100',
            option.name === sort.name ? 'font-medium text-gray-600' : ''
          )}
          onClick={() => handleSort(option)}
          key={option.name}
        >
          {option.name}
        </li>
      ))}
    </ul>
  );
};

export default SortMenu;
