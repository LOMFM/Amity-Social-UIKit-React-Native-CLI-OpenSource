import React, { ReactNode, createContext, useContext, useMemo } from 'react';
import { ICustomComponents } from 'amity-react-native-social-ui-kit/src/v4/types/components.interface';

const CustomComponentContext = createContext<ICustomComponents>(undefined);

interface ICustomComponentProviderProps {
  children: ReactNode;
  components: ICustomComponents;
}

export const CustomComponentProvider = ({
  children,
  components,
}: ICustomComponentProviderProps) => {
  const defaultComponents = useMemo(() => ({}), []);

  const customComponents = useMemo(
    () => ({
      ...defaultComponents,
      ...components,
    }),
    [components, defaultComponents]
  );

  return (
    <CustomComponentContext.Provider value={customComponents}>
      {children}
    </CustomComponentContext.Provider>
  );
};

export const useCustomComponent = () => {
  const context = useContext(CustomComponentContext);
  if (!context) {
    throw new Error(
      'useCustomComponent must be used within a CustomComponentProvider'
    );
  }
  return context;
};
