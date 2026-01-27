import React, { useState } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';

export default function SearchBar({ search }) {
  const [searchTerms, setSearchTerms] = useState('');

  function performSearch() {
    search(searchTerms);
  }

  return (
    <div>
      <Input value={searchTerms} onChange={setSearchTerms} />
      <Button text="Search" onClick={performSearch} />
    </div>
  );
}
