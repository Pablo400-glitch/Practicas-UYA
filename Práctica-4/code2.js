function replaceLongNbsp(html, minLength) {
    // GENERAR EL DOM
    let parser = new DOMParser(),
        doc = parser.parseFromString(html, 'text/html'),
        treeWalker = doc.createTreeWalker(
            doc.body,
            NodeFilter.SHOW_ALL,
            null,
            false
        ),
        node;

    //defino un contador
    let counter = 
        {
            length: 0,      //largo acumulado de caracteres
            nodeList: [],   //nodos previos
            nodeBlocks: [], //fin de bloques
            //métodos
            add: function(text) {
                this.length += text.length;
            },
            addNode: function(node,lastSpace) {
                this.nodeList.push({
                    node: node,
                    lastSpace: lastSpace
                });
            },
            shiftNode: function() {
                return this.nodeList.shift();
            },
            reset: function(onlyIfNodeIsEndOfBlock) {
                //resetar el contador
                //si se pasa un nodo, sólo resetear si es el fin de display=='block'
                let end;
                if (
                    !onlyIfNodeIsEndOfBlock ||
                    this.nodeBlocks.length &&
                    !!~(end=this.nodeBlocks.indexOf(onlyIfNodeIsEndOfBlock))
                ) {
                    this.length = 0;
                    if (this.nodeList.length)
                        this.nodeList = [];
                    while (end > -1) {
                        this.nodeBlocks.splice(end,1);
                        end = this.nodeBlocks.indexOf(onlyIfNodeIsEndOfBlock);
                    }
                }
            },
            newBlock: function(node) {
                //cuando es un nuevo display=='block', resetear contador
                this.reset();
                //y guardar el nodo donde termina
                let origNode = node,
                    nodeSibling;
                while (origNode && !(nodeSibling = origNode.nextSibling)) {
                    //buscar el hermano o el hermano del padre
                    origNode = origNode.parentNode;
                }
                if (nodeSibling) {
                    this.nodeBlocks.push(nodeSibling);
                }
            }
        }
    ;
    
        
    // ITERAR CADA NODO, concatenando texto
    while (treeWalker.nextNode()) {
        node = treeWalker.currentNode;
        counter.reset(node);
        if (node.nodeType === Node.ELEMENT_NODE) { // <TAG>
            // elemento con display=='block' ?
            if (displayBlock.check(node)) {
                //nueva línea => resetear y guardar el fin
                counter.newBlock(node);
            }
        } else if (node.nodeType === Node.TEXT_NODE) { // nodo de Texto
            // separar en palabras y reemplazar si exceden el largo
            const words = node.textContent
                              .split(/([^\S\xa0]+)|(\[[^\]]+\])/)
                              .map(function(x) {return x || ''}), 
                  n = words.length - 1,
                  splits = 3;
            let lastSpace = 0;
            node.textContent = words.reduce(function(acc, word, i) {
                if (i % splits === 0) { // palabras
                    if (word.length + counter.length >= minLength) {
                        //palabra larga => REEMPLAZAR!
                        word = nbToSpFrom(word, 0, false, false);
                        //y reemplazar en toda la última palabra de este nodo
                        // (tomando las partes que separadas por corchetes)
                        nbToSpFrom(acc, lastSpace, function(x) {acc = x});
                        //y reemplazar en los nodos previos
                        let prevNode;
                        while (prevNode = counter.shiftNode()) {
                            nbToSpFrom(
                                prevNode.node.textContent,
                                prevNode.lastSpace,
                                function(x) {prevNode.node.textContent = x}
                            );
                        }
                    } else { //palabra corta
                        // acumular largo
                        counter.add(word);
                        if (i === n && counter.length) { // última => guardar nodo
                            counter.addNode(node,lastSpace);
                        }
                    }
                } else if (i % splits === 1 && word) { // espacio => borrar acumulado
                    counter.reset();
                    lastSpace = acc.length;
                }
                if (word)
                    return acc + word;
                return acc;
            }, '');
        }
    }

    return doc.body.innerHTML;
}


// función aux para modificar NBSP a espacios desde una posición
// (opcional: ignorar entre corchetes)
function nbToSpFrom(str, pos, byRefCallback, ignoreBrackets) {
    ignoreBrackets = (ignoreBrackets===undefined ? true : ignoreBrackets);
    let nbsp = (ignoreBrackets ? /(\[[^\]]*])|\xa0/g : /\xa0/g),
        modif = false;
    if (pos < str.length) {
        str = str.slice(0, pos) +
        str.slice(pos).replace(nbsp, function(m, c) {
            if (ignoreBrackets && c) return c;
            modif = true;
            return ' ';
        });
        if (modif && byRefCallback) {
           byRefCallback(str);
           return true;
        }
        return str;
    }
}

// Función aux para obtener el style.display por default de un elemento
//
var displayBlock = {};
displayBlock.checked = {};
displayBlock.check = function(node) {
    //1er intento: .style.display
    let display = node.style.display;
    if (!display) {
        let tagName = node.nodeName;
        //2do intento: si ya se buscó antes
        if (this.checked.hasOwnProperty(tagName)) {
            display = this.checked[tagName];
        } else {
            //3er intento: agregarlo a document y getComputedStyle()
            let el = document.createElement(tagName);
            document.body.appendChild(el);
            display = window.getComputedStyle(el, null).display;
            document.body.removeChild(el);
            this.checked[tagName] = display;
        }
    }
    return !~['contents', 'inline', 'table-cell', ''].indexOf(display);
}



// ------------
//    PRUEBA
// ------------

const html = [
  'laaaaaaaaaar&nbsp;goooo[foo&nbsp;bar baz]ooooooooooo&nbsp;oooooooo',
  '',
  'no haría match en este caso',
  '(en realidad coincide, pero lo devuelve sin modificar):',
  'abcdfghijklmnño<i></i>pqrstuvxyzqwerty',
  '',
  'si no contamos las etiquetas, su longitud es tan solo de 16:',
  '<div><span>padre&nbsp;<b>Terreros:&nbsp;</b></span></div>',
  '',
  'Algunos ejemplos, además del anterior, serían los siguientes',
  '(lo estiré para contar al &nbsp; como 1):',
  '&nbsp;<a href="http://elpais.com/diario/1978/02/22/256950016_850215.html"',
  'style="outline-style: none; outline-width: initial; outline-color: initial;',
  'display: inline; ">"Tienda&nbsp;<i>País</i>&nbsp;21.1.56abcdef890</a>',
  '',
  'Lo mismo, pero con 29 caracteres:',
  '&nbsp;<a href="http://elpais.com/diario/1978/02/22/256950016_850215.html"',
  'style="outline-style: none; outline-width: initial; outline-color: initial;',
  'display: inline; ">"Tienda&nbsp;<i>País</i>&nbsp;21.1.56abcdef89</a>',
  '',
  '<input type="text" value="esto > no_se_rompe_y_&nbsp_queda_sin_modificar">',
  '<!-- <<<>>> también_ignora_los_&nbsp;_en_comentarios <<<>>> -->',
  '',
  'Toma un <div> como nueva línea:',
  'ccccccoooooooooo&nbsp;o<div>ooooooo&nbsp;rrrrrr</div>ttttttttttt&nbsp;ooooo',
  'cooooooooooooo</div>rr&nbsp;rr[abc&nbsp;defghijklmnop]toooooooooooo',
  'llllaaaaaaaaaar&nbsprrrggggooooooooo'
].join('\n');


let resultado = replaceLongNbsp(html, 30);