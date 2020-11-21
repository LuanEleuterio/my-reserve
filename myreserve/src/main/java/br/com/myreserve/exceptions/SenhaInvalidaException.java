package br.com.myreserve.exceptions;

public class SenhaInvalidaException extends RuntimeException{
	
	public SenhaInvalidaException() {
		super("Senha inválida!");
	}
}
