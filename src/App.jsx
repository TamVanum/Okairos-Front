import React from 'react'
import esES from 'antd/es/locale/es_ES';
import { router } from "./router/index.jsx"
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme as antdTheme } from 'antd'


const { darkAlgorithm } = antdTheme;

const theme = {
    "token": {
        "colorSuccess": "#52c41a",
        "colorPrimary": "#fa8c16",
        "colorInfo": "#fa8c16",
        "colorWarning": "#1677ff",
        "borderRadius": 8,
        "sizeStep": 4
    },
    // "algorithm": darkAlgorithm
}

const customTables = {
    ...esES,
    Pagination: {
        ...esES.Pagination,
        items_per_page: 'por página',
        jump_to: 'Ir a',
        jump_to_confirm: 'confirmar',
        page: '',
        prev_page: 'Página anterior',
        next_page: 'Página siguiente',
        prev_5: 'Anteriores 5 páginas',
        next_5: 'Siguientes 5 páginas',
        prev_3: 'Anteriores 3 páginas',
        next_3: 'Siguientes 3 páginas',
        page_size: 'Tamaño de página',
        showSizeChanger: 'Cambiar tamaño',
    }
};

const App = () => {
    return (
        <ConfigProvider theme={theme} locale={customTables}>
            <RouterProvider router={router} />
        </ConfigProvider>
    );
}

export default App;