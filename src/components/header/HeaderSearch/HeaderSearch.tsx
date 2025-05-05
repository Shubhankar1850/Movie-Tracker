import React, { useState, useEffect } from 'react';
import { AutoComplete, Input } from 'antd';
import type { AutoCompleteProps } from 'antd';
import "./HeaderSearch.css";
import useDebounce from '../../../CustomHooks/useDebounce';
import movieApi from '../../../services/api';
import { useNavigate } from 'react-router';


interface HeaderSearchProps {
  isMobile?: boolean;
  menuClose?: Function;
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ isMobile, menuClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const navigate = useNavigate();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedSearchTerm) {
        setOptions([]);
        return;
      }

      try {
        const res = await movieApi.fetchbyName(debouncedSearchTerm, 1);

        if (res.Response === 'True' && res.Search) {
          const formatted = res.Search.map((movie: any) => ({
            value: movie.imdbID, 
            label: (
              <div className="search-result-item" key={movie.imdbID}>
                <img 
                  src={movie.Poster} 
                  alt={movie.Title} 
                  width="50" 
                  style={{ marginRight: 8 }} 
                />
                <span>{movie.Title} ({movie.Year})</span>
              </div>
            ),
          }));

          setOptions(formatted);
        } else {
          setOptions([]);
        }
      } catch (error) {
        console.error(error);
        setOptions([]);
      }
    };

    fetchResults();
  }, [debouncedSearchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const onSelect = (imdbID: string) => {
    menuClose && menuClose(false);
    navigate(`/movies/${imdbID}`);
  };

  return (
    <AutoComplete
      popupClassName="custom-search-dropdown"
      popupMatchSelectWidth={false}
      style={{ width: isMobile ? "80%" : 300 }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
      size={isMobile ? "middle" : "large"}
      className={isMobile ? "mobile-search" : ""}
    >
      <Input.Search 
        size={isMobile ? "middle" : "large"}
        placeholder="Search Movies"
        allowClear
        variant="borderless"
        className="custom-search" 
        enterButton
      />
    </AutoComplete>
  );
};

export default HeaderSearch;
