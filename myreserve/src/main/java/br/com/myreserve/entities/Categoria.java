package br.com.myreserve.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Categoria {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_categoria;
	private String tipo_categoria;
	
	public Categoria() {}

	public Categoria(String tipo_categoria) {
		this.tipo_categoria = tipo_categoria;
	}

	public Integer getId_categoria() {
		return id_categoria;
	}

	public String getTipo_categoria() {
		return tipo_categoria;
	}

	public void setTipo_categoria(String tipo_categoria) {
		this.tipo_categoria = tipo_categoria;
	}
	
	
	
	

}
