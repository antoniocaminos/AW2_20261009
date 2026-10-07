/* ============================================================
   AREA DE IMPORTACION
   ============================================================ */
import express from 'express';
import cors from 'cors';      ///importo cors despues de installarlo como dependencia
import dotenv from 'dotenv';
import dayjs from 'dayjs';
import logger from './middlewares/logger.middleware.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import { fileURLToPath } from 'url';         /////importo fileURLToPath de la libreria url
import path from 'path';                       /////importo path de la libreria path


/* ============================================================
   CONFIGURACION
   ============================================================ */
dotenv.config();
const puertoENV = process.env.PORT || 4000;
const now = dayjs();

const __filename = fileURLToPath(import.meta.url);   /////obtengo el nombre del archivo actual
const __dirname = path.dirname(__filename);           /////obtengo el directorio del archivo actual





/* ============================================================
   SERVIDOR + MIDDLEWARES
   ============================================================ */
const app = express(); ///inmediatamete despues de llamara a express configuramos cors para que acepte peticiones de cualquier origen
app.use(cors());  ///configuro cors para que acepte peticiones de cualquier origen


app.use(express.json());
app.use(logger);
////////////agregamos la carpetta public para servir archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));// 1° argumento es la carpeta public, 2° argumento es la carpeta raiz del servidor

/* ============================================================
   RUTAS
   ============================================================ */
/* app.get('/', (req, res) => res.send('hola soy el get')); *///ruta anterior que tenia solo un hola en el get
app.get('/', (req, res) => res.redirect('/login.html')); ///ruta que redirige al login
app.use('/usuarios', usuariosRoutes);

/* ============================================================
   INICIO
   ============================================================ */
app.listen(puertoENV, () => {
  console.log(`👌*********************************************`);
  console.log(`✅ Servidor corriendo en http://localhost:${puertoENV}`);
  console.log(`🌐 Login:     http://localhost:${puertoENV}/login.html`);
  console.log(`📊 Dashboard: http://localhost:${puertoENV}/dashboard.html`);
  console.log(`❌**************Ctrl+C para salir**************`);
  console.log(`***********************************************`);
  console.log(`**📅 last update: ${now.format('dddd YYYY-MM-DD HH:mm:ss')}**`);
});
/* url para postman: http://localhost:3000/usuarios/login 
http cats codigos de mensaje
*/