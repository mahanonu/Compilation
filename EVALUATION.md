# compilation-ensg-devoir-2021

**NB: Pour toute reponse nécéssitant un schema, vous pouvez utiliser sketchpad (https://sketch.io/sketchpad/), télécharger le résultat au format pdf et me le joindre à votre réponse.**


1 - Quel formalisme doit on aux auteurs **John Backus** et **Peter Naurr** ? Et à quoi sert-il ?

La BNF qui permet d'écrire les règles syntaxiques des languages.

2 - Donnez la grammaire capable de lire la syntaxe bien parenthésée suivante :
`[[{}([{}]){{}}]]`

E -> '[' E | '{' E | '(' E | ')' E | '}' E | ']' E | €

3 - Donnez la grammaire (lexer et parser) capable de comprendre du XML
exemple :
``` xml
<xml>
  <persons>
    <person firstName="Ada" lastName="Lovelace" />
    <person firstName="Grace" lastName="Hopper"/>
  </persons>
</xml>
```
lexer: 
person = '<person firstName=' phrase 'lastName=' phrase '/>';
balise = '<' key '> '</' key '>;
phrase = {word [' ']};
key = ('xml' | 'persons');
word = {character};
character = (a-z);

4 - Transformez la grammaire suivante afin de résoudre le problème de la recursivité à gauche. **(2 points)**
``` go
E -> E '*' E | E '/' E | '-' E | n | €
```



5 - La grammaire `E -> E '||' E | E | €` est-elle acceptable pour un parseur **LR** ? Pourquoi ?



6 - Cette grammaire est inexact, pourquoi ?
``` go
A -> M '||' A
M -> E '&&' M
E -> '!' A | n
```

A et M sont autorécursives  sans de condition d'arrêt. Cette grammaire est inexacte car elle ne termine pas.

7 - Dessinez l'AST correspondant à la formule suivante, avec le respect de la précédence des opérateurs : 
  - `(1 + 1) * 2 * (3 + 4) - 5`

	       '-'
	      /  \
	    '*'    5
	    / \
	  '*'     '+'
	  / \   / \
 	 2  '+'  3  4
	    / \
	   1   1
8 - A partir du premier AST, schematisez ce qu'il se passe dans la pile d'exécution lors de sa resolution
(vous devez dessiner une pile pour chaque étape en précisant les operations effectuées si nécéssaire) **(2 points)**

[ 2 ]
[ 2 | 1 ]
[ 2 | 1 | 1 ]
[ 2 | 1 | 1 | + ]
[ 2 | 2 ]
[ 2 | 2 | * ]
[ 4 ]
[ 4 | 3 ]
[ 4 | 3 | 4 ]
[ 4 | 3 | 4 | + ]
[ 4 | 7 ]
[ 4 | 7 | * ]
[ 28 ]
[ 28 | 5 ]
[ 28 | 5 | - ]
[ 23 ] 


9 - Dans une machine à pile, à l'aide des operations PUSH n, ADD et MULT écrivez un pseudo programme machine qui correspond à la formule de la question 7 : 

push 2 
push 1 
push 1 
add 
mult
push 3
push 4
add
mult
push 5 
substract

10 - Donnez deux raison pour lesquelles l'interpreteur du premier `Basic` n'est pas performants. Quels grammaire aurait il été impossible d'implémenter avec ce type de parseur ?

Les erreurs sont détectées après exécution et le cout mémoire est fort.
Une grammaire LR n'aurait pas pu être implémentée.

11 - Quel est la complexité d'un algorithme **`ll(*)`** ? Et comment l'optimiser (citez le nom de la technique et la decrire) ?


12 - Que veut dire **AOP** et décrir le paradigme

AOP = aspect oriented programming
Ce paradigme permet la séparation des responsabilités dans une application.

13 - Quel est la différence entre un **typage implicite** et un **typage dynamique**. Peut-on rencontrer les deux concepts dans le même langage ?

Un typage dynamique effectue la vérification lors de l'exécution du programme.
Un typage implicite effectue la vérification lors de l'exécution ou par analyse.
Ces deux concepts peuvent exister dans le même langage (ex: JavaScript)

14 - Donnez 5 exemples de mots possibles à la grammaire suivante : 
``` go
0* 1 ( 2? 1+ 0 )+
```
000110
01210
0110121010
001210
1211010

15 - La grammaire E -> E + n | n accept elle les formules suivantes :
- [ oui ] 1 + 1
- [ non ] + 1
- [ non ] 1 +
- [ non ] +
- [ non ] vide
- [ oui ] 2 + 1 + 1
- [ oui ] 7
- [ non ] e + 1
- [ non ] a + a + a

16 - Transformez les formules arithmétiques suivante en **Lisp** ex. `2 + 3 donne ( + 2 3 )` : **(2 points)**
``` go
5 + 7 * 2 * ( 1 + 1 ) / 4
1 + 2 * 7 + ( 2 * 2 ) + 7
```

( + ( * ( * ( / (+ 1 1) 4) 2) 7) 5)
( + ( + (+ (* 2 7) 1) ( * 2 2 )) 7 )


17 - Comme le ferait un analyseur sémantique, optimisez le programme suivant :
``` go
func main (arg) {
	var a int = arg
	var b int = 7
	var c int = a + b
	var d = c

	if d - a < 5 {
		fmt.Println("La réponse à la question suivante est Algoid, bien entendu ! Mais ne nous distrayons pas. :-)")
	} else {
		fmt.Println("Le résultat de " + a + " + " + b + " est " + d)
	}
}
```


Bonus - Quel est le meilleur langage au monde ? (20 points)

Algoid ? **oui** / **oui**

Nan.... J'rigole :-)
Bonne continuation à tous :-)

