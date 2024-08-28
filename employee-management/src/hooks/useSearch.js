import { useState, useEffect } from 'react';

const useSearch = (data, query) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (!query) {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter(
          (item) =>
            item.first_name.toLowerCase().includes(query.toLowerCase()) ||
            item.last_name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [data, query]);

  return filteredData;
};

export default useSearch;
