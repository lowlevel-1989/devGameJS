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


Clase - DEVGAME.entity.Rect
  Atributos:
    x         -> posicion en eje x
    y         -> posicion en eje y
    direction -> direccion
    hSpeed    -> velocidad horizontal
    vSpeed    -> velocidad vertical
    speed     -> velocidad
    xPrevious -> posicion previa de x
    yPrevious -> posicion previa de y
    xStart    -> posicion inicial x
    yStart    -> posicion inicial y
    parent    -> entidad padre
    context   -> contexto
    color     -> color
    visible   -> si es visible en el Juegos
    width     -> ancho
    height    -> alto
    fill      -> relleno
    sprite    -> instancia de sprite
    type      -> tipo de entidad
  Metodos:
    setContext -> le asigna el contexto
    getX       -> retorna la posicion en x real
    getY       -> retorna la posicion en y real
    logic      -> logica que ejecutara cada ciclo de juego
    setSprite  -> Asigna un sprite
    clone      -> clona el objeto
    draw       -> dibuja el objeto en pantalla
    collision  -> detecta colision con otro rectangulo
    collisionCircle -> detecta colision con un circulo
    exec       -> ejecuta un ciclo de juego


Funcion - DEVGAME.requestAnimationFrame(loop)
  informacion  -> https://developer.mozilla.org/es/docs/Web/API/Window/requestAnimationFrame
