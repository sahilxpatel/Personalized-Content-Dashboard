import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeProvider } from "next-themes";

import "@/lib/i18n";
import { ModalProvider } from "@/components/ui/ModalProvider";
import { ToastProvider } from "@/components/ui/ToastProvider";
import contentReducer from "@/features/content/contentSlice";
import favoritesReducer from "@/features/favorites/favoritesSlice";
import preferencesReducer from "@/features/preferences/preferencesSlice";
import themeReducer from "@/features/theme/themeSlice";

export const createTestStore = (preloadedState?: Record<string, unknown>) =>
  configureStore({
    reducer: testReducer,
    preloadedState: preloadedState as Partial<TestState>,
  });

const testReducer = combineReducers({
  preferences: preferencesReducer,
  favorites: favoritesReducer,
  content: contentReducer,
  theme: themeReducer,
});

type TestState = ReturnType<typeof testReducer>;

export const renderWithProviders = (ui: ReactElement, preloadedState?: Record<string, unknown>) => {
  const store = createTestStore(preloadedState);

  return {
    store,
    ...render(
      <Provider store={store}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <DndProvider backend={HTML5Backend}>
            <ToastProvider>
              <ModalProvider>{ui}</ModalProvider>
            </ToastProvider>
          </DndProvider>
        </ThemeProvider>
      </Provider>,
    ),
  };
};
