import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useMemo, useState } from 'react';

interface IFilterContext {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

export const FilterContext = createContext<IFilterContext>({
  date: undefined,
  setDate: () => {
    // init
  },
  name: '',
  setName: () => {
    // init
  },
});

export const FilterContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState<string>('');

  const value = useMemo((): IFilterContext => {
    return {
      date,
      setDate,
      name,
      setName,
    };
  }, [date, name]);

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
