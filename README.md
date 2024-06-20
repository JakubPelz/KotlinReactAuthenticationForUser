Jednoduchá aplikace pro BE a FE authentikaci

Aplikace obsahuje frontend psaný v Reactu a backend běží v Kotlinu

FE část:

 - rychlá implementace pro testovací data: registrace, login, defaultpage, mainpage (private)
 - automatické přikládání tokenu do requetů, automatické odchytávání errorů, pravidelný refresh tokenu,
   persistence usera v broseru (ctrl + r), vícejazyčné překlady, public a private routing

BE část:

Endpointy:

privatni metody jsou přístupné na zaklade access tokenu

create user - public metoda na registraci usera
find all users - privatni metoda na vypsani všech uživatelů
find user by id - private metoda která najde uživatele podle ID nebo vrátí patřičný response
find user by username - privatni metoda která najde uživatele podle username (použito při přihlašování) nebo vrátí patřičný response
find user by username from token - privatni metoda použita při (ctrl + r) aby persistovala usera v browseru. 
                                   Tato služba vytáhne username z tokenu a vyhledá uživatele v DB

Authorizační vrstva pracuje s JWT tokeny:

post tokens - vydá access a refresh token - expirační proměné v application.properties
put tokens - vydá nové tokeny na zaklade refresh tokenu
delete tokens - zruší platnost tokenu na zaklade refresh tokenu

JWT filter na odchytávání requstů a validování platnosti tokenu

Security vrsta na encodovani a decodovani hesla pro uložení a jeho nasledovnou změnu v DB, vytvoření public a security endpointů.                               

TODO: 
 1) udělat multijazyčné překlady pro error response
 2) vytvořit xlsx která bude držet všechny errorCodes a errorDescription, při buildu aplikace se z xlsx vytvoří
    soubor s proměnými automaticky generovaných ze souboru
 3) udělat role (admin, user)
 4) debugovat použití loggerFactory
 5) nasadit aplikaci do dockeru
