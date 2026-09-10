import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Sin StrictMode a proposito: queremos un montaje unico y justo para comparar
// el comportamiento real de cada modelo (evita dobles renders/efectos).
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
