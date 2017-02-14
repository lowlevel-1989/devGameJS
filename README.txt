Bueno para empezar devGameJs es un motor de juego experimentar.

1.- Primero entendamos un poco como esta pensando este motor

Para iniciar tenemos que saber que tenemos es que necesitamos
de un objeto canvas y su contexto en 2D, que se puede ver
claramente en los ejemplos.

2.- Tenemos Contenedores los cuales podremos utilizar para crear
las escenas en el juego como grupos de objectos para luego ser
agregados a una escena.

3.- Tenemos entidades la cuales representan los objetos en el Juegos
estas pueden ser rectangulos o circulos.

Empecemos explicando cada metodo y atributo de la clase Rect


// Crear objeto rectangulo
CLASE - DEVGAME.entity.Rect
  ARGUMENTOS:
     x:      posicion en el eje x           | tipo: int    | default: 0
     y:      posicion en el eje y           | tipo: int    | default: 0
     width:  ancho                          | tipo: int    | default: 0
     height: alto                           | tipo: int    | default: 0

  ATRIBUTOS:
    x         -> posicion en eje el x
    y         -> posicion en eje el y
    width     -> ancho
    height    -> alto


    direction -> direccion                  | tipo: int    | default: 1
    hSpeed    -> velocidad horizontal       | tipo: int    | default: 0
    vSpeed    -> velocidad vertical         | tipo: int    | default: 0
    speed     -> velocidad                  | tipo: int    | default: 0

    color     -> color                      | tipo: string | default: '#000'
    visible   -> si es visible en el Juegos | tipo: bool   | default: true
    fill      -> relleno

    // Estas son controladas por el motor
    xPrevious -> posicion previa de x       | tipo: int    | default: x
    yPrevious -> posicion previa de y       | tipo: int    | default: y
    xStart    -> posicion inicial x         | tipo: int    | default: x
    yStart    -> posicion inicial y         | tipo: int    | default: y

    // Estas que son mas complejas se documentaran mas adelante
    sprite    -> instancia de sprite
    type      -> tipo de entidad
    parent    -> entidad padre
    context   -> contexto

  METODOS:
    setContext -> le asigna el contexto
      ARGS: (contexto)

    getX       -> retorna la posicion en x real
      ARGS: ()

    getY       -> retorna la posicion en y real
      ARGS: ()

    logic      -> logica que ejecutara cada ciclo de juego
      DEF: logic se debe asignar una funcion definida por el programador

    clone      -> clona el objeto
      ARGS: ()

    draw       -> dibuja el objeto en pantalla
      ARGS: ()

    exec       -> ejecuta un ciclo de juego
      ARGS: ()

    // Estas que son mas complejas se documentaran mas adelante
    setSprite  -> Asigna un sprite
    collision  -> detecta colision con otro rectangulo
    collisionCircle -> detecta colision con un circulo


//Contador de pasos
CLASE - DEVGAME.Timer
  ARGUMENTOS: ({fps: int}) // Frame por segundo
  ARGUMENTOS: ({ms:  int}) // Milisegundos
  ARGUMENTOS: (ms)         // Milisegundos

  METODOS:
    logic -> Logica que se ejecutara una vez el timer cuente los pasos asignados
      DEF: logic se debe asignar una funcion definida por el programador

    reset -> reinicia los pasos
      ARGS: ()

    exec -> Se debe ejecutar para contar cada paso
      ARGS: ()

Funcion - DEVGAME.requestAnimationFrame
  ARGS: (loop)
  INFO: https://developer.mozilla.org/es/docs/Web/API/Window/requestAnimationFrame


// Crear objeto container
CLASE - DEVGAME.Container
  ARGUMENTOS:
     x:      posicion en el eje x           | tipo: int    | default: 0
     y:      posicion en el eje y           | tipo: int    | default: 0

  ATRIBUTOS:
    x         -> posicion en eje el x
    y         -> posicion en eje el y


    direction -> direccion                  | tipo: int    | default: 1
    hSpeed    -> velocidad horizontal       | tipo: int    | default: 0
    vSpeed    -> velocidad vertical         | tipo: int    | default: 0
    speed     -> velocidad                  | tipo: int    | default: 0

    color     -> color                      | tipo: string | default: '#000'
    visible   -> si es visible en el Juegos | tipo: bool   | default: true

    // Estas son controladas por el motor
    xPrevious -> posicion previa de x       | tipo: int    | default: x
    yPrevious -> posicion previa de y       | tipo: int    | default: y
    xStart    -> posicion inicial x         | tipo: int    | default: x
    yStart    -> posicion inicial y         | tipo: int    | default: y

    // Estas que son mas complejas se documentaran mas adelante
    parent    -> entidad padre
    context   -> contexto

  METODOS:
    setContext -> le asigna el contexto
      ARGS: (contexto)

    getX       -> retorna la posicion en x real
      ARGS: ()

    getY       -> retorna la posicion en y real
      ARGS: ()

    logic      -> logica que ejecutara cada ciclo de juego
      DEF: logic se debe asignar una funcion definida por el programador

    exec       -> ejecuta un ciclo de juego
      ARGS: ()

    add        -> agrega entidades al container
      ARGS: (rect, rect, arc) // Todas las entidades que se quieran agregrar
      ARGS: (rect) // Luego puedes agregar mas de ser necesario

    render     -> dibuja los objetos en pantalla
      ARGS: ()

    get        -> devuelve el objeto en la posicion x
      ARGS: (posicion | int)

    forEach    -> Recorre todos los objetos del container
      DEF: funciona como cualquier otro forEach






