interface IRequestOptions {
  method: string;
  headers: {
    [fieldName: string]: string;
  };
}

export const EXERCISES_OPTIONS: IRequestOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const YOUTUBE_OPTIONS: IRequestOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const fetchData = async (url: string, options: IRequestOptions) => {
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};
