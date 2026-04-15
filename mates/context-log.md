# Context Log - Sesion 12 abril 2026

## Estado actual del proyecto

Web de estudio de Mates CCSS II para 2o Bachillerato. GitHub Pages en:
https://xoaninc.github.io/Temario-Bachillerato-Matem-ticas-CCSS-II/

Repo: github.com:xoaninc/Temario-Bachillerato-Matem-ticas-CCSS-II.git

### Estructura de carpetas
```
mates/
├── index.html              ← Landing principal (diseño premium, ambos trimestres)
├── CLAUDE.md
├── README.md
├── context-log.md          ← Este archivo
├── 1trimestre/             ← COMPLETO, bien hecho
│   ├── style.css, index.html, tema1.html, tema2.html, tema3.html
│   ├── herramientas.html, tests.html, examenes.html
│   ├── *.pdf, *.HEIC, jpg/
├── 3trimestre/             ← EN PROGRESO, necesita reescritura de temas
│   ├── style.css           (copia del de 1trimestre)
│   ├── graphs.js           (motor de graficos canvas para tema oscuro)
│   ├── index.html           ← OK
│   ├── tema6.html           ← NECESITA REESCRITURA (ver abajo)
│   ├── tema7.html           ← NECESITA REESCRITURA (ver abajo)
│   ├── tema8.html           ← NECESITA REESCRITURA (ver abajo)
│   ├── herramientas.html    ← OK (calculadora, tablas, errores, formulas)
│   ├── tests.html           ← OK (26 preguntas: 10 T6, 8 T7, 8 T8)
│   ├── examenes.html        ← OK (ponencia 2025-2026, selectividad, ponencia 24/25, clase)
│   ├── *.pdf               (PDFs fuente del temario)
```

## QUE FALTA: Reescribir tema6, tema7, tema8

### El problema
Los temas del 3er trimestre estan demasiado secos comparados con los del 1er trimestre.
El usuario pidio explicitamente que se reescriban al mismo nivel de detalle.

### Como es el nivel de detalle del 1er trimestre (referencia: tema1.html)
Leer 1trimestre/tema1.html para ver el patron. Puntos clave:

1. **Explicaciones largas en lenguaje humano** de cada concepto, no solo la formula
2. **Tablas con notacion/significado/ejemplo** para cada simbolo nuevo
   - Ejemplo: tabla con columnas Suceso | Que es | Notacion | Ejemplo (dado)
3. **Varios ejemplos por seccion** (minimo 2, a veces 3-4)
4. **Tags en cada card**: `<span class="exam-tag si">Suele entrar</span>` o `<span class="exam-tag no">No suele entrar</span>`
5. **Trucos y tips** tipo examen dentro de los ejemplos ("Truco:", "Clave:", "Atencion:")
6. **Conexiones entre conceptos** - explicar POR QUE necesitas cada cosa
7. **Cards de diferentes tipos**: definition (azul), formula (teal), example (verde), warning (amber), important (rojo)
8. **Ejemplos con contexto real** (fabricas, estudiantes, urnas, etc.)

### Que falta en cada tema

#### tema6.html (Funciones, Limites, Continuidad)
- Falta explicar que significa cada simbolo: $\mathbb{R}$, $\setminus$, $\text{Dom}(f)$, $\lim$, $\to$, $\infty$, $\exists$, $\nexists$
- Falta explicar que es $f(x)$ para alguien que lo ve por primera vez
- Los dominios necesitan mas ejemplos (al menos 2 por tipo)
- Las indeterminaciones necesitan tabla clara de "que hago cuando sale esto"
- Las asintotas necesitan explicacion de que significa geometricamente
- Continuidad necesita mas enfasis en el metodo I, II, III de la profesora
- Faltan tags "Suele entrar" / "No suele entrar"

#### tema7.html (Derivadas)
- Falta explicar que es f'(x) en lenguaje humano (velocidad de cambio)
- La tabla de derivadas esta bien pero falta contexto de cuando usar cada una
- Recta tangente necesita explicacion geometrica mas clara
- Monotonia necesita un "paso a paso" mas detallado como en el PDF
- Faltan mas ejemplos resueltos
- Faltan tags

#### tema8.html (Integrales)
- Falta explicar que significa el simbolo $\int$
- Falta explicar la relacion derivar <-> integrar de forma intuitiva
- La tabla de integrales necesita ejemplos al lado
- Barrow necesita mas ejemplos
- Areas necesita mas enfasis en los errores tipicos (olvidar valor absoluto)
- Faltan tags

### Tags de selectividad (ya puestos, no cambiar)
- Cada seccion h2 tiene `<span class="sel-tag si">Selectividad</span>`
- Asintota oblicua tiene `<span class="sel-tag no">No selectividad</span>`
- Banners de ponencia al inicio de cada tema
- Formato I., II., III. para continuidad (metodo de la profesora Lucia)

### Sidebar (ya arreglado)
Todos los ficheros del 3er trimestre tienen el sidebar con:
- Inicio
- Tema 6 (secciones)
- Tema 7 (secciones)
- Tema 8 (secciones)
- Herramientas
- Examenes y ejercicios  ← al final, despues de herramientas

### Graficos (ya hechos, no tocar)
- graphs.js tiene plotGraph() con soporte para funciones, areas, asintotas, puntos abiertos/cerrados
- tema6 tiene 8 graficos (tipos funcion, asintotas, continuidad)
- tema7 tiene 4 graficos (tangente, monotonia, curvatura, inflexion)
- tema8 tiene 4 graficos (4 casos de area)
- examenes tiene 15 graficos en los ejercicios

### Calculadora (ya hecha, no tocar)
En herramientas.html al final. Campo de texto + botones rapidos + plotGraph.

### Tests (ya hechos, no tocar)
tests.html con 26 preguntas (10 T6, 8 T7, 8 T8), 6 aleatorias por intento.

### Examenes (ya hecho, no tocar)
examenes.html con:
- Modelo ponencia 2025-2026 (ej 2a y 2b resueltos)
- 4 ejercicios de selectividad 2022-2023 resueltos
- 8 ejercicios de la Ponencia Analisis 24/25 resueltos (ej 7-14)
- 7 ejercicios de clase (pizarra 16 mar, 17 mar, 6 abr)
- 15 graficos canvas
- Formato I, II, III en todos los de continuidad
- Tags de fuente (PDF + pagina + ejercicio)

## Ponencia selectividad 2025-2026
PDF en: sel_2025-2026-Orientaciones_matematicas_aplicadas.pdf
Lo que entra del 3er trimestre segun el usuario (confirmado por el):
- Dominio: SI
- Limites: SI
- Indeterminaciones: SI
- Asintotas V y H: SI
- Asintota oblicua: NO
- Continuidad: SI
- TVM: SI
- Derivada + reglas + cadena: SI
- Recta tangente: SI
- Recta normal: SI (no esta claro pero ponerlo como que si)
- Monotonia/extremos/curvatura/inflexion: SI
- Optimizacion: SI
- Integrales (todo): SI

## PDFs fuente del 3er trimestre
Ya en 3trimestre/:
- Tema 6 Funciones, límites, asíntotas y continuidad.pdf (20 pags)
- Tema 7 Derivadas y aplicaciones.pdf (19 pags)
- TEMA 8 Integral.pdf (20 pags)
- REPASO de Funciones_Matemáticas Aplicadas a las CCSSII.pdf (3 pags)

PDF adicional:
- /Users/juanmaciasgomez/Downloads/Análisis Envía La Ponencia 24_25 resueltos (1) (2).pdf (18 pags, ejercicios 7-14 resueltos a mano)

## Datos del usuario
- Estudiante de 2o Bachillerato CCSS en IES Murillo (Andalucia)
- Profesora: Lucia Moreno Lopez (se fue del instituto el 6 de abril)
- El usuario prefiere trabajo directo, sin sub-agentes
- Habla en espanol informal, tutea
- La web es para estudiar para selectividad

## Proximos pasos
1. Reescribir tema6.html con nivel de detalle del 1er trimestre
2. Reescribir tema7.html con nivel de detalle del 1er trimestre
3. Reescribir tema8.html con nivel de detalle del 1er trimestre
4. Commit + push
