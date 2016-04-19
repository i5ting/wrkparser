%{
  #include "stdio.h"
%}
%%
Running                  { printf("Number: %s  %d\n",yytext,yyleng); }
[a-z]     printf("%c",yytext[0]+'A'-'a');
Latency              { printf("Number: %s  %d\n",yytext,yyleng); }
%%

showtitle(yytext)
{
  printf("----- Lex Example -----\n %d" , yytext);
}